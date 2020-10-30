import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
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
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {
  }

  login(authData: AuthData): void {
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout(): void {
    this.user = null;
    this.authChanged.next(false);
    this.router.navigate(['login']);
  }

  registerUser(authData: AuthData): void {
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
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
