import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClientsComponent } from 'app/pages/clients/clients.component';
import {PlansComponent} from '../../pages/plans/plans.component';
import {UsersComponent} from '../../pages/users/users.component';
import {ClientHasPlanComponent} from '../../pages/client-has-plan/client-has-plan.component';
import {ClientsRecordComponent} from '../../pages/clients/clients-record/clients-record.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },

    { path: 'clientes', component: ClientsComponent, children: [
            { path: 'historial/:id', component: ClientsRecordComponent }
        ]},
    {path: 'planes', component: PlansComponent},
    {path: 'usuarios', component: UsersComponent},
    {path: 'client-has-plans', component: ClientHasPlanComponent}
];
