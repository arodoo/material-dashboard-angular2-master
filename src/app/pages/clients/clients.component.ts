import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client, Gender} from 'app/models/client';
import {User} from 'app/models/user';
import {Plan} from 'app/models/plan';
import {ClientsService} from 'app/services/clients.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../services/users.service';
import {PlansService} from '../../services/plans.service';
import {ClientHasPlan} from '../../models/client-has-plan';
import {ClientHasPlansService} from '../../services/client-has-plans.service';
import {lastValueFrom} from 'rxjs';

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
    addPlanToClientTitle = 'Agregar plan a cliente';
    addPlanToClientClientOptions = '';

    clients: Client[];
    users: User[];
    plans: Plan[];
    loadedClient: Client;
    clientPlan: Client;

    clientHasPlan: ClientHasPlan =
        {
            contractId: 0,
            client: {
                clientId: 0,
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                emergencyPhoneNumber: '',
                birthday: null,
                gender: Gender.M,
                active: true,
                streetAddress: '',
                addressNumber: '',
                colony: '',
                city: '',
                state: '',
                zipCode: '',
            },
            plan: {
                planId: 0,
                planName: '',
                description: '',
                price: 0,
                numDays: 0,
            },
            user: {
                userId: 0,
                userName: '',
                passwordHash: '',
                email: '',
            },
            contractDate: null,
            startDate: null,
            endDate: null,
            isActive: null,
        };

    Gender = Gender;
    p = 1;

    isClientPlanActiveTxt: String;
    isClientPlanActiveSaveButton = true;
    protected filter = '';
    currentDate = new Date();

    showForm = false;
    showAddPlanToClientForm = false;

    isSeeClientActive = false;
    clientId: number;
    isChildLoaded = false;
    isClientPlanActive = false;


    constructor(private clientService: ClientsService,
                private userService: UsersService,
                private planService: PlansService,
                private clientHasPlanService: ClientHasPlansService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.isChildLoaded = false;
        try {
            this.clientService.getAllClients().subscribe((clients) => {
                    this.clients = clients;
                },
                (error) => {
                    alert(error);
                });
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
            active: [true],
            streetAddress: ['', Validators.required],
            addressNumber: ['', Validators.required],
            colony: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
        });

        this.newAddPlanToClientForm = this.fb.group({
            contractId: [''],
            client: ['', Validators.required],
            plan: ['', Validators.required],
            user: ['', Validators.required],
            contractDate: [''],
            startDate: [''],
            endDate: [''],
            isActive: [''],
        });
    }


    showNewClientForm() {
        this.showForm = true;
    }

    async verifyClientStatus(clientId: number): Promise<boolean> {
        this.clientService.getClientByClientId(clientId).subscribe({
            next: (client: Client) => {
                if (client.active) {
                    this.addPlanToClientTitle = 'El cliente ' + this.clientPlan.firstName + ' ' + this.clientPlan.lastName + ' ya cuenta con un plan activo';
                    this.newAddPlanToClientForm.disable();
                    return true;
                } else {
                    this.addPlanToClientTitle = 'El cliente ' + this.clientPlan.firstName + ' ' + this.clientPlan.lastName + ' no está activo';
                    this.isClientPlanActiveSaveButton = false;
                    this.newAddPlanToClientForm.enable();
                    return false;
                }
            },
            error: () => {
                this.snackBar.open('Error de sistema', 'Cerrar',
                    {duration: 3000})
                return false;
            }
        })
        return this.isClientPlanActive;
    }

    showNewAddPlanToClientForm(client: Client) {
        this.clientPlan = client;
        this.verifyClientStatus(client.clientId).then((result) => {
            this.isClientPlanActive = result;
        });
        this.showAddPlanToClientForm = true;
        this.addPlanToClientClientOptions = this.clientPlan.firstName;
    }

    cancel() {
        this.showForm = false;
        this.resetForm();
        this.showAddPlanToClientForm = false;
        this.isClientPlanActive = false;
        this.resetAddPlanToClientForm();

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

    addPlanToClient() {
        let clientId, planId, userId;
        try {
            clientId = this.newAddPlanToClientForm.value.client.clientId;
            planId = this.newAddPlanToClientForm.value.plan.planId;
            userId = this.newAddPlanToClientForm.value.user.userId;
        } catch (e) {
            console.log(e);
        }
        this.clientHasPlan.client.clientId = clientId;
        this.clientHasPlan.plan.planId = planId;
        this.clientHasPlan.user.userId = userId;
        this.clientHasPlanService.addPlanToClient(this.clientHasPlan).subscribe({
            next: (clientHasPlan) => {
                this.resetAddPlanToClientForm();
                this.snackBar.open('Plan agregado', 'Cerrar', {
                    duration: 3000
                });
                this.cancel();
            },
            error: (error) => {
                this.snackBar.open('Error al agregar plan', 'Cerrar', {
                    duration: 3000
                });
                console.log(error);
            }
        });
    }


    deleteClient(clientId
                     :
                     number
    ) {
        if (confirm('¿Estás seguro de eliminar el cliente? Esto eliminará a todos los registros relacionados con el cliente')) {
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

    async loadClient(clientId: number) {
        const client$ = this.clientService.getClientByClientId(clientId);
        this.loadedClient = await lastValueFrom(client$);
    }

    showClientRecord() {

    }

    seeClient(client:
                  Client
    ) {
        this.loadClient(client.clientId).then(r => {
            this.newClientForm.patchValue(this.loadedClient);
        });
        this.clientId = client.clientId;
        // console.log(this.clientId);
        this.formTitle = client.firstName + ' ' + client.lastName;
        this.disableForm();
        if (this.newClientForm.value.active === true) {
            this.isClientPlanActiveTxt = 'Activo';
        } else {
            this.isClientPlanActiveTxt = 'Vencido';
        }
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
            active: true,
            streetAddress: '',
            addressNumber: '',
            colony: '',
            city: '',
            state: '',
            zipCode: '',
        });
    }

    resetAddPlanToClientForm() {
        this.newAddPlanToClientForm.reset({
            contractId: null,
            client: '',
            plan: '',
            user: '',
            contractDate: this.currentDate,
            startDate: this.currentDate,
            endDate: this.currentDate,
            isActive: false,
        });
    }

    getSelectPlanStyle() {
        const planMat = this.newAddPlanToClientForm.get('plan').value;
        return {
            'background-color': planMat ? planMat.color : 'white', // Color de fondo según el plan
            'font-size': '16px', // Tamaño de la fuente
            'border': '1px solid gray' // Borde del select
        };
    }

    getSelectUserStyle() {
        const userMat = this.newAddPlanToClientForm.get('user').value;
        return {
            'background-color': userMat ? userMat.color : 'white',
            'font-size': '16px',
            'border': '1px solid gray'
        }
    }

    getSelectClientStyle() {
        const clientMat = this.newAddPlanToClientForm.get('client').value;
        return {
            'background-color': clientMat ? clientMat.color : 'white',
            'font-size': '16px',
            'border': '1px solid gray'
        }
    }


    onLoadRecord() {
        this.cancel();
        this.title = 'Historial de ' + this.loadedClient.firstName + ' ' + this.loadedClient.lastName;
        this.isChildLoaded = true;
        console.log(this.clientId);
    }
}
