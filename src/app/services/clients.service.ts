import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'app/models/client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  public getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(environment.backendHost+'/clients');
  }
}
