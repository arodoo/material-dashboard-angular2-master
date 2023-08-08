import {Component, OnInit} from '@angular/core';
import {EntriesService} from '../services/entries.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Entry} from '../models/entry';
import {Client} from '../models/client';
import {ClientsService} from '../services/clients.service';
import {concatAll, Observable, of, switchMap, toArray} from 'rxjs';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    title = 'Entradas';

    p = 1;
    searchTerms = '';

    entries: Entry[];
    clients: Client[];
    client: Client;

    protected filter = '';

    newEntryFrom: FormGroup;

    showForm = false;
    newEntryTitle = 'Nueva entrada';
    showEntries = true;

    constructor(private entryService: EntriesService,
                private clientService: ClientsService,
                private fb: FormBuilder,
                private snackBr: MatSnackBar) {
    }

    ngOnInit(): void {
        this.entryService.getAllEntries().subscribe({
            next: (entries) => {
                this.entries = entries;
            },
            error: (error) => {
                alert(error);
            }
        });
        this.clientService.getAllClients().subscribe({
            next: (clients) => {
                this.clients = clients;
            },
            error: (error) => {
                alert(error);
            }
        });
    }

    showNewEntryTable() {
        this.showForm = true;
        this.p = 1;
    }

    registerEntry(clientId: number) {
        console.log(clientId);
        this.entryService.addEntry(clientId).subscribe({
            next: (entry) => {
                this.entries.push(entry);
                this.showForm = false;
                this.snackBr.open('Entrada registrada', '', {duration: 2000});
                location.reload();
            },
            error: (error) => {
               this.snackBr.open('Error al registrar la entrada' + error);
            }
        });
    }

    deleteEntry(entryId: any) {
        this.entryService.deleteEntry(entryId).subscribe({
            next: (entry) => {
                this.entries = this.entries.filter(e => e.entryId !== entry.entryId);
                this.snackBr.open('Entrada eliminada', '', {duration: 2000});
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    cancel() {
        this.showForm = false;
        this.showEntries = true;
    }
}
