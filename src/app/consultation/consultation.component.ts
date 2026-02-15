import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { catchError, firstValueFrom, timeout } from 'rxjs';

import { CtaButtonComponent } from '../shared/components/cta-button/cta-button.component';
import { environment } from '../../environments/environment';

type PensionStatus = 'receiving' | 'not_assigned' | 'suspended' | null;

@Component({
  selector: 'app-consultation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule, CtaButtonComponent],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css',
})
export class ConsultationComponent {
  private readonly http = inject(HttpClient);
  private readonly workerUrl = environment.consultationWorkerUrl;

  readonly isSubmitting = signal(false);
  readonly isSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly pensionStatusValue = signal<PensionStatus>(null);

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(\+\d{10,15}|\d{9})$/)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    contactMethods: new FormGroup({
      call: new FormControl(false, { nonNullable: true }),
      viber: new FormControl(false, { nonNullable: true }),
      whatsapp: new FormControl(false, { nonNullable: true }),
      telegram: new FormControl(false, { nonNullable: true }),
    }),

    pensionStatus: new FormControl<PensionStatus>(null, {
      validators: [Validators.required],
    }),

    pensionTypes: new FormGroup({
      byAge: new FormControl(false, { nonNullable: true }),
      privileged: new FormControl(false, { nonNullable: true }),
      early: new FormControl(false, { nonNullable: true }),
      byService: new FormControl(false, { nonNullable: true }),
      disability: new FormControl(false, { nonNullable: true }),
      survivor: new FormControl(false, { nonNullable: true }),
      other: new FormControl(false, { nonNullable: true }),
    }),

    questionTypes: new FormGroup({
      byAge: new FormControl(false, { nonNullable: true }),
      privileged: new FormControl(false, { nonNullable: true }),
      early: new FormControl(false, { nonNullable: true }),
      byService: new FormControl(false, { nonNullable: true }),
      recalculation: new FormControl(false, { nonNullable: true }),
      appeal: new FormControl(false, { nonNullable: true }),
      experience: new FormControl(false, { nonNullable: true }),
      other: new FormControl(false, { nonNullable: true }),
    }),

    description: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(2000),
      ],
    }),

    location: new FormControl<'ukraine' | 'abroad' | null>(null),

    consent: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),

    website: new FormControl('', { nonNullable: true }),
  });

  readonly showPensionTypes = computed(() => {
    const status = this.pensionStatusValue();
    return status === 'receiving' || status === 'suspended';
  });

  readonly showQuestionTypes = computed(() => {
    return this.pensionStatusValue() === 'not_assigned';
  });

  constructor() {
    this.form.controls.pensionStatus.valueChanges.subscribe((value) => {
      this.pensionStatusValue.set(value);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const response = await firstValueFrom(
        this.http
          .post<{
            success: boolean;
            error?: string;
          }>(this.workerUrl, this.buildPayload())
          .pipe(
            timeout(15000),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 0)
                throw new Error('Перевірте підключення до інтернету');
              if (error.status === 429)
                throw new Error('Забагато запитів. Спробуйте через годину.');
              throw new Error(error.error?.error || 'Помилка надсилання форми');
            })
          )
      );

      if (response.success) {
        this.isSuccess.set(true);
        this.form.reset();
        this.pensionStatusValue.set(null);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      } else {
        throw new Error(response.error || 'Невідома помилка');
      }
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Спробуйте ще раз пізніше'
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private buildPayload() {
    const formValue = this.form.getRawValue();
    return {
      name: formValue.name,
      phone: formValue.phone,
      email: formValue.email,
      contactMethods: formValue.contactMethods,
      pensionStatus: formValue.pensionStatus,
      pensionTypes: formValue.pensionTypes,
      questionTypes: formValue.questionTypes,
      description: formValue.description,
      location: formValue.location,
      consent: formValue.consent,
      website: formValue.website,
    };
  }

  resetForm(): void {
    this.isSuccess.set(false);
    this.errorMessage.set(null);
    this.pensionStatusValue.set(null);
    this.form.reset();
  }
}
