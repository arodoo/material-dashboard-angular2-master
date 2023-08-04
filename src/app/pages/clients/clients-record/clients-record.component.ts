import {Component, OnInit} from '@angular/core';
import {ClientHasPlan} from '../../../models/client-has-plan';
import {Location} from '@angular/common';

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

    constructor(private location: Location) {
    }

    ngOnInit(): void {
    }

    deleteRecord(record: any) {
        console.log(record);
    }

    goBack() {
        this.location.back();
    }
}
