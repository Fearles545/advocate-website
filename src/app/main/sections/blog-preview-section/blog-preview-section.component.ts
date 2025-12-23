import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Blog } from '../../../blog/blog-posts';
import { CtaOutlineButtonComponent } from '@shared/components/cta-outline-button';

@Component({
  selector: 'app-blog-preview-section',
  imports: [MatIcon, RouterLink, DatePipe, CtaOutlineButtonComponent],
  templateUrl: './blog-preview-section.component.html',
  styleUrl: './blog-preview-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPreviewSectionComponent {
  recentBlogs = input.required<Blog[]>();
}
