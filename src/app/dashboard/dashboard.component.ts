import {Component, OnInit} from '@angular/core';
import {EntriesService} from '../services/entries.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Entry} from '../models/entry';
import {Client} from '../models/client';
import {ClientsService} from '../services/clients.service';
import {concatAll, Observable, of, switchMap, toArray} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {filter} from 'rxjs/operators';

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

    records: Observable<Entry[]>;
    search = new FormControl();
    filteredClients: Observable<Entry[]>;


    newEntryFrom: FormGroup;

    showForm = false;
    newEntryTitle = 'Nueva entrada';
    clientPlan: any;

    constructor(private entryService: EntriesService,
                private clientService: ClientsService,
                private fb: FormBuilder,
                private snackBr: MatSnackBar) {
    }

    ngOnInit(): void {
        this.entryService.getAllEntries().subscribe({
            next: (entries) => {
                this.entries = entries;
                console.log(entries);
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

        this.filteredClients = this.search.valueChanges.pipe(
            startWith(''),
            switchMap(value => this._filter(value)),
            concatAll()
        );

        this.newEntryFrom = this.fb.group({
            entryId: [''],
            client: [''],
            entryDate: [''],
        });
    }

    private _filter(value: string): Observable<Entry[][]> { // Cambias el tipo de retorno por Observable<Entry[][]>
        const filterValue = value.toLowerCase();
        return this.records.pipe(
            toArray(), // Usas el operador toArray para convertir el Observable en un arreglo
            map(records => records.map(c => c.filter(e => e.client.firstName.toLowerCase().includes(filterValue))))
        );
    }

    addEntry() {
        this.entryService.addEntry(this.newEntryFrom.value).subscribe({
            next: (entry) => {
                this.entries.push(entry);
                this.resetForm();
                this.snackBr.open('Entrada agregada', 'OK', {
                    duration: 3000
                });
                this.cancel();
            },
            // tslint:disable-next-line:no-shadowed-variable
            error: (error) => {
                this.snackBr.open(error, 'OK', {
                    duration: 3000
                });
            }
        });
    }

    deleteEntry(entryId: number) {
        if (confirm('¿Está seguro de eliminar la entrada?')) {
            this.entryService.deleteEntry(entryId).subscribe({
                next: (entry) => {
                    this.snackBr.open('Entrada eliminada', 'OK', {
                        duration: 3000
                    });
                    // tslint:disable-next-line:no-shadowed-variable
                    this.entries = this.entries.filter((entry) => entry.entryId !== entryId);
                },
                // tslint:disable-next-line:no-shadowed-variable
                error: (error) => {
                    this.snackBr.open(error, 'OK', {
                        duration: 3000
                    });
                }
            });
        }

    }

    private resetForm() {
        this.newEntryFrom.reset({
            entryId: '',
            client: '',
            entryDate: '',
        });
    }

    cancel() {
        this.showForm = false;
    }

    showNewEntryForm() {
        this.showForm = true;
    }

    getSelectClientStyle() {
        const clientMat = this.newEntryFrom.get('client').value;
        return {
            'background-color': clientMat ? clientMat.color : 'white',
            'font-size': '16px',
            'border': '1px solid gray'
        }
    }
}
