import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogPaginationService {
  pageIndex = signal(0);
  pageSize = signal(5);
}
