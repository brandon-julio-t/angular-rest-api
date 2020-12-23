import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.authService.user()) {
      await this.router.navigateByUrl('/');
    }
  }

  async doLogin(): Promise<void> {
    const { email } = this.loginForm.controls;
    if (email.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.authService
      .login({ email: email.value })
      .add(async () => {
        this.isSubmitting = false;
        this.loginForm.reset();
      })
      .unsubscribe();
  }
}
