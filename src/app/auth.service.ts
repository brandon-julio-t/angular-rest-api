import { Injectable } from '@angular/core';
import { LoginForm } from './login-form';
import { UserService } from './user.service';
import { User } from './user';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'user';

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(data: LoginForm): Subscription {
    const { email } = data;
    return this.userService
      .getUserByEmail(email)
      .pipe(
        retry(3),
        catchError((err) => {
          this.snackBar.open('Invalid username or password', 'Close', {
            duration: 4000,
          });
          return throwError(err);
        })
      )
      .subscribe(async (user) => {
        sessionStorage.setItem(this.storageKey, JSON.stringify(user));
        await this.router.navigateByUrl('/');
      });
  }

  async logout(): Promise<void> {
    if (sessionStorage.getItem(this.storageKey)) {
      sessionStorage.removeItem(this.storageKey);
      await this.router.navigateByUrl('/login');
    }
  }

  user(): User | null {
    const text = sessionStorage.getItem(this.storageKey);
    return text ? JSON.parse(text) : null;
  }
}
