import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();

  isAuth: boolean;
  authSub: Subscription;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authSub = this.authService.authChanged.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }

  onClose(): void {
    this.sidenavClose.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.onClose();
  }
}
