import {Component, OnInit} from '@angular/core';
import {Client} from 'app/models/client';
import {ClientsService} from 'app/services/clients.service';
import {filter} from 'rxjs';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

    clients: Client[];
    newClient: Client;
    p: number = 1;
    isClientActive: String;
    protected filter = "";


    constructor(private clientService: ClientsService) {
    }

    ngOnInit(): void {
        try {
            this.clientService.getAllClients().subscribe((clients) => {
                    this.clients = clients;
                },
                (error) => {
                    console.log(error);
                });
            if (this.isClientActive != "true") {
                this.isClientActive = "Activo";
            } else {
                this.isClientActive = "Inactivo";
            }
        } catch (error) {
            console.log(error);
        }
    }

}
