import { Pipe, PipeTransform } from '@angular/core';

/** Router commands of a court decision's page. */
export function caseRoute(slug: string): string[] {
  return ['/court-cases', slug];
}

@Pipe({
  name: 'caseRoute',
  pure: true,
})
export class CaseRoutePipe implements PipeTransform {
  transform(slug: string): string[] {
    return caseRoute(slug);
  }
}
