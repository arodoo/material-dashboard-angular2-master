import {Client} from './client';
import {Plan} from './plan';
import {User} from './user';

export class ClientHasPlan {
    contractId: number;
    client: Client;
    plan: Plan;
    user: User;
    contractDate: Date;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}
