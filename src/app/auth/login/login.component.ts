import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '../../app.reducer';

import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<{ui: fromApp.AppState}>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
  }

  onSubmit(form: NgForm): void {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
