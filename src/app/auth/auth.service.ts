import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChanged: Subject<boolean> = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
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
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error, null, {
          duration: 3000
        });
      });
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  registerUser(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error, null, {
          duration: 3000
        });
      });
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
