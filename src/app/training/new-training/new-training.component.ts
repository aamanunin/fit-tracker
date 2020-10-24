import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();

  constructor(
    public trainingService: TrainingService
  ) {
  }

  ngOnInit(): void {
  }

  onStartTraining(): void {
    this.trainingStart.emit();
  }
}
