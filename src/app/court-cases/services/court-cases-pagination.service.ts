import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourtCasesPaginationService {
  pageIndex = signal(0);
  pageSize = signal(10);
}
