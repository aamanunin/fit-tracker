import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercise();
  }

}
