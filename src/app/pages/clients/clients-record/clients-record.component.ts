import {Component, OnInit} from '@angular/core';
import {ClientHasPlan} from '../../../models/client-has-plan';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ClientHasPlansService} from '../../../services/client-has-plans.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-clients-record',
    templateUrl: './clients-record.component.html',
    styleUrls: ['./clients-record.component.scss']
})
export class ClientsRecordComponent implements OnInit {
    title: string;
    records: ClientHasPlan[];
    p = 1;
    protected filter = '';

    clientId: number;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private clientHasPlanService: ClientHasPlansService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        try {
            this.route.paramMap.subscribe(params => {
                    this.clientId = +params.get('id');
                    console.log(this.clientId);

                }
            );
            this.clientHasPlanService.getClientHasPlanHistory(this.clientId).subscribe({
                next: records => {
                    this.records = records;
                }
            });
        } catch (e) {
            console.log(e);
        }
        console.log(this.records);
    }

    deleteRecord(contractId: number) {
        if (confirm('¿Estás seguro de eliminar el cliente?')) {
            this.clientHasPlanService.deleteClientHasPlan(contractId).subscribe({
                    next: () => {
                        this.records = this.records.filter(record => record.contractId !== contractId);
                        this.snackBar.open('Cliente eliminado', 'Cerrar', {
                            duration: 3000
                        });
                    }
                }
            );
        }
    }

    goBack() {
        this.location.back();
    }
}
