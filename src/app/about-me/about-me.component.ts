import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-me',
  imports: [NgOptimizedImage, RouterLink, MatButtonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {}
