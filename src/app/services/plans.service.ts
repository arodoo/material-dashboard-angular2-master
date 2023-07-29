import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Plan} from '../models/plan';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlansService {

    constructor(private http: HttpClient) {
    }

    public getAllPlans(): Observable<Plan[]> {
        return this.http.get<Plan[]>(environment.backendHost + '/plans');
    }

    public getPlanByPlanName(planName: string): Observable<Plan> {
        return this.http.get<Plan>(environment.backendHost + '/plans/find' + planName);
    }

    public createPlan(plan: Plan): Observable<Plan> {
        return this.http.post<Plan>(environment.backendHost + '/plans', plan);
    }

    public deletePlan(planId: number): Observable<Plan> {
        return this.http.delete<Plan>(environment.backendHost + '/plans/' + planId);
    }

    public updatePlan(plan: Plan, planId: number): Observable<Plan> {
        return this.http.put<Plan>(environment.backendHost + '/plans/' + planId, plan);
    }
}
