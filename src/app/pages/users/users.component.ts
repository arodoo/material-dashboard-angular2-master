import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    newUserForm: FormGroup;
    p = 1;
    protected filter = '';
    showForm = false;
    saveButtonTitle = 'Guardar'

    constructor(private userService: UsersService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        try {
            this.userService.getAllUsers().subscribe((users) => {
                    this.users = users;
                },
                (error) => {
                    alert(error);
                });
        } catch (error) {
            alert(error);
        }

        this.newUserForm = this.fb.group({
            userId: [''],
            email: ['', [Validators.required, Validators.email], Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
            passwordHash: ['', Validators.required],
            userName: ['', Validators.required],
        });
    }

    showNewUserForm(): void {
        this.showForm = true;
    }


    showNewClientForm() {
        this.showForm = true;
        console.log(this.showForm);
    }

    cancel() {
        this.showForm = false;
        this.resetForm();
    }

    private resetForm() {
        this.newUserForm.reset({
            userId: 0,
            email: '',
            passwordHash: '',
            userName: '',
        });
    }

    updateUser(user: User) {
        this.userService.updateUser(user, user.userId).subscribe({
            next: () => {
                this.snackBar.open('Usuario actualizado', 'Cerrar', {
                    duration: 3000,
                });
            },
            error: (error) => {
                this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
                    duration: 3000,
                });
            }
        })
    }

    addOrUpdateUser() {
        if (this.newUserForm.value.userId) {
            this.updateUser(this.newUserForm.value);
            const index = this.users.findIndex((u) => u.userId === this.newUserForm.value.userId);
            this.users[index] = this.newUserForm.value;
            this.cancel();
        } else {

            this.userService.createUser(this.newUserForm.value).subscribe({
                next: (user) => {
                    this.users.push(user);
                    this.resetForm();
                    this.snackBar.open('Usuario creado', 'Cerrar', {
                        duration: 3000,
                    });
                    this.cancel();
                },
                error: (error) => {
                    this.snackBar.open('Error al crear el usuario', 'Cerrar', {
                        duration: 3000,
                    });
                }
            });
        }
    }

    deleteUser(userId: number) {
        if (confirm('¿Estás seguro de eliminar el cliente? Esto eliminará a todos los registros relacionados con el cliente')) {
            this.userService.deleteUser(userId).subscribe({
                next: () => {
                    this.snackBar.open('Usuario eliminado', 'Cerrar', {
                        duration: 3000,
                    });
                    this.users = this.users.filter((user) => user.userId !== userId);
                },
                error: (error) => {
                    this.snackBar.open('Error al eliminar el usuario', 'Cerrar', {
                        duration: 3000,
                    });
                }
            });
        }
    }

    loadUserToUpdate(user: any) {
        this.formTitle = 'Editar usuario';
        this.saveButtonTitle = 'Actualizar';
        this.showNewUserForm();
        this.newUserForm.setValue({
            userId: user.userId,
            email: user.email,
            passwordHash: user.passwordHash,
            userName: user.userName,
        });
    }
}
