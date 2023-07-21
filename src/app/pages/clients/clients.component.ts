import { Component, OnInit } from '@angular/core';
import { Client } from 'app/models/client';
import { ClientsService } from 'app/services/clients.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  dtOptions: DataTables.Settings = {}; // Opciones de la tabla
  dtTrigger: Subject<any> = new Subject<any>(); // Disparador para renderizar la tabla

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    // Configurar las opciones de la tabla
    this.dtOptions = {
      pagingType: 'full_numbers', // Mostrar botones de paginación con números
      pageLength: 10, // Mostrar 10 filas por página
      processing: true // Mostrar indicador de carga
    };


    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
      this.dtTrigger.next(1); // Disparar el renderizado de la tabla
    },
    (error) => {
      console.log(error);
    });
  }

}
