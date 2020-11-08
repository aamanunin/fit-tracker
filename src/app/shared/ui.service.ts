import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  constructor(
    private snackbar: MatSnackBar
  ) {
  }

  showSnackbar(message: string, action: string, config: MatSnackBarConfig): void {
    this.snackbar.open(message, action, config);
  }
}
