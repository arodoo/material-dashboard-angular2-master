import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './clients/clients.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterPipe} from '../filter.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PlansComponent} from './plans/plans.component';
import {BaseComponent} from './base/base.component';
import {UsersComponent} from './users/users.component';


@NgModule({
    declarations: [
        ClientsComponent,
        FilterPipe,
        PlansComponent,
        BaseComponent,
        UsersComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ],
    exports: [
        ClientsComponent,
        PlansComponent,
        UsersComponent
    ]
})
export class PagesModule {
}
