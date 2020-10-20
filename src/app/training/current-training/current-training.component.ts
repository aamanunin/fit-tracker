import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  private sub: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.sub = interval(250)
      .pipe(
        tap(() => this.progress = this.progress + 1)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
