import { Pipe, type PipeTransform } from '@angular/core';
import { baseUrl } from '@core/config/base-url';

@Pipe({
  name: 'appBlogBaseUrl',
})
export class BlogBaseUrlPipe implements PipeTransform {
  transform(slug: string | undefined): string {
    const blogBaseUrl = `${baseUrl}/blog`;

    if (!slug) {
      return blogBaseUrl;
    }

    return `${blogBaseUrl}/${slug}/`;
  }
}
