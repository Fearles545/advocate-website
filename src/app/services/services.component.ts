import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const iconNames = [
      'handshake',
      'mail',
      'people',
      'lock',
      'calculator',
      'card',
      'checklist',
      'check',
      'question',
      'person',
      'legal-case',
      'letter',
      'document',
      'document-appeal',
      'executive',
      'question-1',
    ];
    iconNames.forEach((iconName) => {
      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl(
          `assets/services-icons/${iconName}.svg`
        )
      );
    });
  }
}
