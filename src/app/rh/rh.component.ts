import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrl: './rh.component.css'
})
export class RhComponent {
  isMenuVisible = false;
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Show a logout notification
    this.snackBar.open('Logout successful!', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
