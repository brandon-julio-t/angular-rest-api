import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null;

  constructor(private authService: AuthService) {
    this.user = authService.user();
  }

  ngOnInit(): void {}

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
