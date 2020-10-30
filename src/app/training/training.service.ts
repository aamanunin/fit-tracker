import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged: Subject<Exercise> = new Subject<Exercise>();
  exercisesChanged$: Subject<Exercise[]> = new Subject<Exercise[]>();
  finishedExerciseChanged$: Subject<Exercise[]> = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises(): void {
    this.db
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
        this.availableExercises = exercises;
        this.exercisesChanged$.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string): void {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(): void {
    this.addExerciseToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  stopExercise(progress: number): void {
    this.addExerciseToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * progress / 100,
      calories: this.runningExercise.calories * progress / 100,
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise(): Exercise {
    return this.runningExercise;
  }

  fetchCompletedOrCancelledExercise(): void {
    this.db.collection('finishedExercises')
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
        this.finishedExerciseChanged$.next(exercises);
      });
  }

  addExerciseToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }
}
