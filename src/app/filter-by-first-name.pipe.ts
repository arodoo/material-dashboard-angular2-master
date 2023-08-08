import { Pipe, PipeTransform } from '@angular/core';
import {Client} from './models/client';

@Pipe({
  name: 'filterByFirstName'
})
export class FilterByFirstNamePipe implements PipeTransform {

  transform(clients: Client[], filter: string): Client[] {
    if (!clients || !filter) {
      return clients;
    }
    return clients.filter((c => c.firstName.toLowerCase().includes(filter.toLowerCase())));
  }
}
