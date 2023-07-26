import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterPipe} from '../filter.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    ClientsComponent,
      FilterPipe
  ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ],
  exports: [
    ClientsComponent
  ]
})
export class PagesModule { }
