import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from 'app/models/client';
import {Gender} from '../../models/client';
import {ClientsService} from 'app/services/clients.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

    title = 'Clientes';
    clients: Client[];
    newClientForm: FormGroup;
    Gender = Gender;
    p = 1;
    isClientActive: String;
    protected filter = '';
    currentDate = new Date();
    showForm = false;

    constructor(private clientService: ClientsService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
    }

    showNewClientForm() {
        this.showForm = true;
        console.log(this.showForm);
    }

    cancel() {
        this.showForm = false;
        this.resetForm();
    }



    ngOnInit(): void {
        try {
            this.clientService.getAllClients().subscribe((clients) => {
                    this.clients = clients;
                },
                (error) => {
                    alert(error);
                });
            // tslint:disable-next-line:triple-equals
            if (this.isClientActive != 'true') {
                this.isClientActive = 'Activo';
            } else {
                this.isClientActive = 'Inactivo';
            }
        } catch (error) {
            alert(error);
        }

        this.newClientForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email], Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
            phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], // Assuming a 10-digit phone number
            emergencyPhoneNumber: ['', Validators.pattern('[0-9]{10}')], // Assuming a 10-digit emergency phone number
            birthday: [this.currentDate, Validators.required],
            gender: [Gender.M, Validators.required],
            isActive: [null],
            streetAddress: ['', Validators.required],
            addressNumber: ['', Validators.required],
            colony: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
        });
    }


    addClient() {
        this.clientService.createClient(this.newClientForm.value).subscribe({
            next: (client) => {
                this.clients.push(client);
                this.resetForm();
                this.snackBar.open('Cliente agregado', 'Cerrar', {
                    duration: 3000
                });
                this.cancel();
            },
            error: (error) => {
                this.snackBar.open('Error al agregar cliente', 'Cerrar', {
                    duration: 3000
                });
            }
        });
    }

    resetForm() {
        this.newClientForm.reset({
            clientId: null,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            emergencyPhoneNumber: '',
            birthday: this.currentDate,
            gender: Gender.M,
            isActive: true,
            streetAddress: '',
            addressNumber: '',
            colony: '',
            city: '',
            state: '',
            zipCode: '',
        });
    }


    deleteClient(clientId: number) {
        if (confirm('¿Estás seguro de eliminar el cliente?')) {
            this.clientService.deleteClient(clientId).subscribe({
                next: (client) => {
                    // tslint:disable-next-line:no-shadowed-variable
                    this.clients = this.clients.filter((client) => client.clientId !== clientId);
                    this.snackBar.open('Cliente eliminado', 'Cerrar', {
                        duration: 3000
                    });
                },
                error: (error) => {
                    alert(error);
                }
            });
        }
    }
}
