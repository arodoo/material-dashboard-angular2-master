import {Component, OnInit} from '@angular/core';
import {Client} from 'app/models/client';
import {Gender} from '../../models/client';
import {ClientsService} from 'app/services/clients.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

    clients: Client[];
    newClientForm: FormGroup;

    Gender = Gender;
    p: number = 1;
    isClientActive: String;
    protected filter = "";
    currentDate = new Date();
    displayForm: boolean = false;


    constructor(private clientService: ClientsService,
                private fb: FormBuilder) {
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
            alert(error);
        }

        this.newClientForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email], Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
            phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], // Assuming a 10-digit phone number
            emergencyPhoneNumber: ['', Validators.pattern('[0-9]{10}')], // Assuming a 10-digit emergency phone number
            birthday: [this.currentDate, Validators.required],
            gender: [Gender.M, Validators.required, ],
            isActive: [true],
            streetAddress: ['', Validators.required],
            addressNumber: ['', Validators.required],
            colony: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
        });
    }

    showNewClientForm() {
        this.displayForm = true;
        console.log(this.displayForm);
    }

    addClient() {
        this.clientService.createClient(this.newClientForm.value).subscribe({
            next: (client) => {
                this.clients.push(client);
                this.newClientForm.reset({
                    clientId: null,
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    emergencyPhoneNumber: '',
                    birthday: null,
                    gender: Gender.M,
                    isActive: true,
                    streetAddress: '',
                    addressNumber: '',
                    colony: '',
                    city: '',
                    state: '',
                    zipCode: '',
                });
            },
            error: (error) => {
                alert(error);
            }
        });
    }

}
