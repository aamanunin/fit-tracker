import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor() { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDay());
  }

  onSubmit(form: NgForm): void {

  }
}
