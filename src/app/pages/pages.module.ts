import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterPipe} from "../filter.pipe";




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
    ],
  exports: [
    ClientsComponent
  ]
})
export class PagesModule { }
