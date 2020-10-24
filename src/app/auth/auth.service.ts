import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChanged: Subject<boolean> = new Subject<boolean>();
  private user: User;

  constructor(
    private router: Router
  ) {
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  logout(): void {
    this.user = null;
    this.authChanged.next(false);
    this.router.navigate(['login']);
  }

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  getUser(): User {
    return {...this.user};
  }

  isAuth(): boolean {
    return !!this.user;
  }

  private authSuccessfully(): void {
    this.authChanged.next(true);
    this.router.navigate(['training']);
  }
}
