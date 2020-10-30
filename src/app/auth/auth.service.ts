import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChanged: Subject<boolean> = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {
  }

  initAuthListener(): void {
    this.fireAuth.authState
      .subscribe((user) => {
        if (user) {
          this.isAuthenticated = true;
          this.authChanged.next(true);
          this.router.navigate(['training']);
        } else {
          this.trainingService.cancelSubs();
          this.isAuthenticated = false;
          this.authChanged.next(false);
          this.router.navigate(['login']);
        }
      });
  }

  login(authData: AuthData): void {
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  registerUser(authData: AuthData): void {
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
