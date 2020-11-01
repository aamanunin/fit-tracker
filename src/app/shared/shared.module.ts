import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FlexModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class SharedModule { }
