import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]); 
  }

  logout() {
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('userName'); 
    localStorage.clear();  
    this.router.navigate(['']); 
  }
}
