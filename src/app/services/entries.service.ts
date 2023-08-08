import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Entry} from '../models/entry';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EntriesService {

    constructor(private http: HttpClient) {
    }

    public getAllEntries(): Observable<Entry[]> {
        return this.http.get<Entry[]>(environment.backendHost + '/entries');
    }

    public addEntry(entry: Entry): Observable<Entry> {
        return this.http.post<Entry>(environment.backendHost + '/entries', entry);
    }

    public deleteEntry(entryId: number): Observable<Entry> {
        return this.http.delete<Entry>(environment.backendHost + '/entries/' + entryId);
    }

    public getEntryHistoryByClientId(clientId: number): Observable<Entry[]> {
        return this.http.get<Entry[]>(environment.backendHost + '/entries/history/' + clientId);
    }
}
