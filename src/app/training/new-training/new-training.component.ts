import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = true;
  private loadingSub: Subscription;
  private exercisesSub: Subscription;

  constructor(
    private trainingService: TrainingService,
    public uiService: UIService
  ) {
  }

  ngOnInit(): void {
    this.exercisesSub = this.trainingService.exercisesChanged$
      .subscribe((exercises) => this.exercises = exercises);
    this.loadingSub = this.uiService.loadingStateChanged
      .subscribe((loading) => this.isLoading = loading);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
    this.exercisesSub.unsubscribe();
  }

  fetchAgain(): void {
    this.trainingService.fetchAvailableExercises();
  }
}
