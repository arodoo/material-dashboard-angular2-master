import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {
    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.backendHost + '/users');
    }

    public getUserByUserEmail(userEmail: string): Observable<User> {
        return this.http.get<User>(environment.backendHost + '/users/find' + userEmail);
    }

    public createUser(user: User): Observable<User> {
        return this.http.post<User>(environment.backendHost + '/users', user);
    }

    public deleteUser(userId: number): Observable<User> {
        return this.http.delete<User>(environment.backendHost + '/users/' + userId);
    }

    public updateUser(user: User, userId: number): Observable<User> {
        return this.http.put<User>(environment.backendHost + '/users/' + userId, user);
    }
}
