// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Keep this for routing support
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Only keep necessary imports for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
