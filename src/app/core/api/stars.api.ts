import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { stars } from '../../mock/stars';

@Injectable({
  providedIn: 'root'
})
export class StarsApi{

    //Retorna la lista filtrada sino toda la lista
    private getFilteredList(query: string | Map<string, string>) {
      if (typeof query === 'string') {
        return stars.filter(p => p.nombre.includes(query));
      }
      if (query instanceof Map) {
        return stars;
      }
    }

    private getFilteredListUniversity(query: string | Map<string, string>) {
      console.log('query',query);
      
      if (typeof query === 'string') {        
        return stars.filter(p => p.universidad.includes(query));
      }
      if (query instanceof Map) {
        return stars;
      }
    }

    getPageUniversity(page:number ,pageSize:number ,query:string | Map<string,string>){
      const filteredList = this.getFilteredListUniversity(query);
      console.log('universidades',filteredList);
      
      const startIndex = (page-1)*pageSize;
      const endIndex = startIndex + pageSize;
      return timer(1000).pipe(
          mapTo({
              count: filteredList.length,
              data: filteredList.slice(startIndex,endIndex)
          })
      ); 
  }


  getPage(page:number ,pageSize:number ,query:string | Map<string,string>){
    const filteredList = this.getFilteredList(query);
    console.log('universidades',filteredList);
    
    const startIndex = (page-1)*pageSize;
    const endIndex = startIndex + pageSize;
    return timer(1000).pipe(
        mapTo({
            count: filteredList.length,
            data: filteredList.slice(startIndex,endIndex)
        })
    ); 
}

    getSearch(page:number ,pageSize:number ,query:string | Map<string,string>){
      const filteredList = this.getFilteredList(query);
    }
}