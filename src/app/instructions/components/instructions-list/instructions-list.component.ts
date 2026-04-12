import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  instructions,
  instructionsByCategory,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_ORDER,
  InstructionCategory,
} from '../../data';
import { InstructionRoutePipe } from '../../pipes/instruction-route.pipe';

@Component({
  selector: 'app-instructions-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon, InstructionRoutePipe],
  templateUrl: './instructions-list.component.html',
  styleUrl: './instructions-list.component.css',
})
export class InstructionsListComponent {
  categories = CATEGORY_ORDER;
  categoryLabels = CATEGORY_LABELS;
  categoryIcons = CATEGORY_ICONS;
  groupedInstructions = instructionsByCategory();

  stepsLabel(count: number): string {
    if (count === 1) return '1 крок';
    if (count >= 2 && count <= 4) return `${count} кроки`;
    return `${count} кроків`;
  }
}
