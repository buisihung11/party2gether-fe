import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(private authService: AuthService) {
    this.items = [
      {
        label: 'Sign out',
        icon: 'pi pi-sign-out',
        command: this.signOut.bind(this),
      },
    ];
  }

  ngOnInit(): void {}

  signOut() {
    console.log(this.authService.userState);
    this.authService.signOut();
  }

  get user() {
    return this.authService.userState;
  }
}
