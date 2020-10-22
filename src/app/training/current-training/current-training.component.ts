import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {StopTrainingComponent} from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  private sub: Subscription;

  @Output() trainingExit = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  startOrResumeTimer(): void {
    this.sub = interval(250)
      .subscribe(() => {
        this.progress = this.progress + 1;
        if (this.progress === 100) {
          this.sub.unsubscribe();
        }
      });
  }

  onStop(): void {
    this.sub.unsubscribe();
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
