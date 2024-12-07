import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginDto, AuthenticationDto } from './dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5053/api';  // Ensure this URL is correct for your API

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<AuthenticationDto> {
    return this.http.post<AuthenticationDto>(`${this.apiUrl}/auth/login`, loginDto).pipe(
      tap((response: AuthenticationDto) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      })
    );
  }
}
