import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    title = 'Usuarios';
    formTitle = 'Nuevo usuario';

    users: User[];
    newUserForm: User;
    p = 1;
    protected filter = '';
    showForm = false;

    constructor(private userService: UsersService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

}
