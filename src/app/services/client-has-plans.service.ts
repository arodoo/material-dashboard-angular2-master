import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientHasPlan} from '../models/client-has-plan';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientHasPlansService {

    constructor(private http: HttpClient) {
    }

    public getAllClientHasPlans(): Observable<ClientHasPlan[]> {
        return this.http.get<ClientHasPlan[]>(environment.backendHost + '/clientHasPlans');
    }

    public addPlanToClient(clientHasPlan: ClientHasPlan): Observable<ClientHasPlan> {
        return this.http.post<ClientHasPlan>(environment.backendHost + '/clientHasPlans', clientHasPlan);
    }

    public getClientHasPlanHistory(clientId: number): Observable<ClientHasPlan[]> {
        return this.http.get<ClientHasPlan[]>(environment.backendHost + '/clientHasPlans/history/' + clientId);
    }

    public deleteClientHasPlan(recordId: number): Observable<ClientHasPlan> {
        return this.http.delete<ClientHasPlan>(environment.backendHost + '/clientHasPlans/' + recordId);
    }
}
