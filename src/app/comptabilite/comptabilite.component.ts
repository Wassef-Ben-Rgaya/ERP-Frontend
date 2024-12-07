import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent {

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
