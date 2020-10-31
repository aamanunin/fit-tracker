import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Observable<Exercise[]>;
  isLoading = true;
  private loadingSub: Subscription;

  constructor(
    private trainingService: TrainingService,
    public uiService: UIService
  ) {
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged
      .subscribe((loading) => this.isLoading = loading);
    this.trainingService.fetchAvailableExercises();
    this.exercises = this.trainingService.exercisesChanged$;
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  fetchAgain(): void {
    this.trainingService.fetchAvailableExercises();
  }
}
