import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  imports: [NgOptimizedImage, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
