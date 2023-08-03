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
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ClientHasPlanComponent } from './client-has-plan/client-has-plan.component';


@NgModule({
    declarations: [
        ClientsComponent,
        FilterPipe,
        PlansComponent,
        BaseComponent,
        UsersComponent,
        ClientHasPlanComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatInputModule,
        MatSelectModule
    ],
    exports: [
        ClientsComponent,
        PlansComponent,
        UsersComponent
    ]
})
export class PagesModule {
}
