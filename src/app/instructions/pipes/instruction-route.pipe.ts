import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instructionRoute',
  pure: true,
})
export class InstructionRoutePipe implements PipeTransform {
  transform(slug: string): string[] {
    return ['/instructions', slug];
  }
}
