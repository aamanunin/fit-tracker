import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import * as Ui from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {
  }

  fetchAvailableExercises(): void {
    this.store.dispatch(new Ui.StartLoading());
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((results) => {
          return results.map((result) => {
            const {name, duration, calories} = result.payload.doc.data() as Exercise;
            return {
              id: result.payload.doc.id,
              name,
              duration,
              calories
            };
          });
        })
      )
      .subscribe((exercises) => {
        this.store.dispatch(new Ui.StopLoading());
        this.store.dispatch(new Training.SetAvailableExercises(exercises));
      }, (error => {
        this.store.dispatch(new Ui.StopLoading());
        this.uiService.showSnackbar('Fetch exercises failed, please train again!', null, {duration: 3000});
      }))
    );
  }

  startExercise(selectedId: string): void {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise(): void {
    this.store.select(fromTraining.getActiveTraining)
      .pipe(
        take(1)
      )
      .subscribe((ex) => {
        this.addExerciseToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed'
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  stopExercise(progress: number): void {
    this.store.select(fromTraining.getActiveTraining)
      .pipe(
        take(1)
      )
      .subscribe((ex) => {
        this.addExerciseToDatabase({
          ...ex,
          duration: ex.duration * progress / 100,
          calories: ex.calories * progress / 100,
          date: new Date(),
          state: 'cancelled'
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  fetchCompletedOrCancelledExercise(): void {
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .pipe(
        map((exercises: any[]) => {
          return exercises.map(exercise => {
            return {
              ...exercise,
              date: exercise.date.toDate()
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedExercises(exercises));
      }));
  }

  addExerciseToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubs(): void {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
