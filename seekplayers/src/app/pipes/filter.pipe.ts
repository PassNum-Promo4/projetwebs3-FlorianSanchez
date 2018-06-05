// Settings pipe i have used for the research bar on players page

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {      // my parameters for my research bar 
      return (it.server + ' ' + it.pseudo + ' ' + it.rank + ' ' + it.mainchamp + ' ' + it.role).toLowerCase().includes(searchText);
    });
   }
}

