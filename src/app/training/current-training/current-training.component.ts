import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  private sub: Subscription;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  startOrResumeTimer(): void {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;

    this.sub = interval(step)
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
        this.trainingService.stopExercise();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
