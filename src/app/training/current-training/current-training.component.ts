import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as fromTraining from '../training.reducer';

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
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  startOrResumeTimer(): void {
    this.sub = this.store.select(fromTraining.getActiveTraining)
      .pipe(
        map(ex => ex.duration / 100 * 1000),
        mergeMap(step => interval(step))
      )
      .subscribe(() => {
        this.progress = this.progress + 1;
        if (this.progress === 100) {
          this.trainingService.completeExercise();
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
        this.trainingService.stopExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
