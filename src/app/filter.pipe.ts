
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return this.contains(it, searchText);
        });
    }

    contains(obj: any, searchText: string): boolean {
        for (const key in obj) {
            if (typeof obj[key] === 'string' &&
                obj[key].toLowerCase().includes(searchText)
            ) {
                return true;
            }
        }
        return false;
    }
}
