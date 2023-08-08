import {Component, OnInit} from '@angular/core';
import {ClientHasPlan} from '../../models/client-has-plan';
import {ClientHasPlansService} from '../../services/client-has-plans.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Gender} from '../../models/client';

@Component({
    selector: 'app-client-has-plan',
    templateUrl: './client-has-plan.component.html',
    styleUrls: ['./client-has-plan.component.scss']
})
export class ClientHasPlanComponent implements OnInit {

    title = 'Últimas compras de planes';

    userName: string;
    clientName: string;
    planName: string;
    endDate: Date;
    startDate: Date;

    clientHasPlans: ClientHasPlan[];
    p = 1;
    protected filter = '';

    constructor(private clientHasPlanService: ClientHasPlansService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        try {
            this.clientHasPlanService.getAllClientHasPlans().subscribe({
                next: (clientHasPlans) => {
                    this.clientHasPlans = clientHasPlans;
                }
            });
        } catch (error) {
            alert(error);
        }

    }

    deleteClientHasPlanEntry(contractId: any) {
        if (confirm('Seguro que deseas eliminar la entrada? esta acción no puede deshacerse')) {
            this.clientHasPlanService.deleteClientHasPlan(contractId).subscribe({
                next: (deletedPlan) => {
                    this.clientHasPlans = this.clientHasPlans.filter((clientHasPlan) => clientHasPlan.contractId !== contractId);
                    this.snackBar.open('Plan eliminado', 'Cerrar', {
                        duration: 3000,
                    });
                },
                error: (error) => {
                    this.snackBar.open('Error al eliminar el plan', 'Cerrar', {
                        duration: 3000,
                    });
                }
            });
        } else {
            return null;
        }
    }


    showClientHasPlanDetails(clientHasPlan: any) {

    }
}


