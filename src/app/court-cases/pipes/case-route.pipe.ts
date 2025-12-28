import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caseRoute',
  pure: true,
})
export class CaseRoutePipe implements PipeTransform {
  transform(caseNumber: string): string[] {
    return ['/court-cases', ...caseNumber.split('/')];
  }
}
