import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from 'app/models/client';
import {User} from 'app/models/user';
import {Plan} from 'app/models/plan';
import {Gender} from '../../models/client';
import {ClientsService} from 'app/services/clients.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../services/users.service';
import {PlansService} from '../../services/plans.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

    newAddPlanToClientForm: FormGroup;
    newClientForm: FormGroup;

    title = 'Clientes';
    formTitle = 'Nuevo cliente';
    addPlanToClientTitle = 'Agregar plan';

    clients: Client[];
    users: User[];
    plans: Plan[];

    Gender = Gender;
    p = 1;
    isClientActive: String;
    protected filter = '';
    currentDate = new Date();
    showForm = false;
    isSeeClientActive = false;


    constructor(private clientService: ClientsService,
                private userService: UsersService,
                private planService: PlansService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
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
        this.userService.getAllUsers().subscribe({
            next: (users) => {
                this.users = users;
            },
            error: (error) => {
                alert(error);
            }
        });
        this.planService.getAllPlans().subscribe({
            next: (plans) => {
                this.plans = plans;
            },
            error: (error) => {
                alert(error);
            }
        });

        this.newClientForm = this.fb.group({
            clientId: [''],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email], Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
            phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], // Assuming a 10-digit phone number
            emergencyPhoneNumber: ['', Validators.pattern('[0-9]{10}')], // Assuming a 10-digit emergency phone number
            birthday: [this.currentDate, Validators.required],
            gender: [Gender.M, Validators.required],
            isActive: [this.isClientActive],
            streetAddress: ['', Validators.required],
            addressNumber: ['', Validators.required],
            colony: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
        });
    }


    showNewClientForm() {
        this.showForm = true;
        console.log(this.showForm);
    }

    cancel() {
        this.showForm = false;
        this.resetForm();
        this.isSeeClientActive = false;
        this.formTitle = 'Nuevo cliente';
        this.enableForm();
    }

    disableForm() {
        this.newClientForm.disable();
    }

    enableForm() {
        this.newClientForm.enable();
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

    seeClient(client: Client) {
        this.formTitle = client.firstName + ' ' + client.lastName;
        this.newClientForm.patchValue(client);
        this.disableForm();
        this.isSeeClientActive = true;
        this.showForm = true;
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


    addPlanToClient() {
        alert('Agregando plan a cliente');
    }
}
