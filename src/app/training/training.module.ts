import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule
  ]
})
export class TrainingModule { }
