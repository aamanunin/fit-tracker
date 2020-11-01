import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuth()) {
      this.router.navigate(['login']);
    }

    return true;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuth()) {
      this.router.navigate(['login']);
    }

    return true;
  }
}
