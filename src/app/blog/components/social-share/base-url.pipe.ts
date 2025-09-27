import { Pipe, type PipeTransform } from '@angular/core';
import { baseUrl } from '@core/config/base-url';

@Pipe({
  name: 'appBlogBaseUrl',
})
export class BlogBaseUrlPipe implements PipeTransform {
  transform(value: string | undefined): string {
    const blogBaseUrl = `${baseUrl}/blog`;

    if (!value) {
      return blogBaseUrl;
    }

    return `${blogBaseUrl}/${value}`;
  }
}
