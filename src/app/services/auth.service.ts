import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {GlobalApiService} from "./global-api.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<any> {
    return firstValueFrom(
        this.http.post<any>(`${GlobalApiService}/api/v1/login`, {
          email,
          password,
        })
    );
  }

  register(email: string, password: string): Promise<void> {
    return firstValueFrom(
        this.http.post<void>(`${GlobalApiService}/api/v1/register`, {
          email,
          password,
        })
    );
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token') as string;
  }
  // checks of the token is valid
  isLoggedIn(): boolean {
    const token: string | undefined =
        (localStorage.getItem('token') as string) || undefined;
    if (!token) {
      return false;
    }
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const isExpired = Math.floor(new Date().getTime() / 1000) >= expiry;
    if (isExpired) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }
}
