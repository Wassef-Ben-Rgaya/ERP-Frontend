import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { LoginDto, PersonnelDto } from '../../dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      matricule: ['', Validators.required],
      mdp: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginDto: LoginDto = this.loginForm.value;
      this.apiService.login(loginDto).subscribe(
        (response) => {
          console.log('Login successful:', response);
          // Store the token and handle successful login
          localStorage.setItem('token', response.token);
          // Show success notification
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          // Get user details and redirect based on the role
          this.apiService.getCurrentUserDetails().subscribe(
            (user: PersonnelDto) => {
              let redirectUrl = '/home';
              switch (user.poste) {
                case 'Rh':
                  redirectUrl = '/rh';
                  break;
                case 'Comptable':
                  redirectUrl = '/comptabilite';
                  break;
                case 'Operateur':
                  redirectUrl = '/personnel';
                  break;
              }
              this.router.navigate([redirectUrl]);
            },
            (error) => {
              console.error('Failed to get user details', error);
              this.snackBar.open('Failed to get user details', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-error']
              });
            }
          );
        },
        (error) => {
          console.error('Login error:', error);
          // Show error notification based on the status code
          if (error.status === 400) {
            this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          } else {
            this.snackBar.open('An unexpected error occurred. Please try again later.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        }
      );
    }
  }
}  