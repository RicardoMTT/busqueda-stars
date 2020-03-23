import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { timer } from 'rxjs';
import { mapTo,map } from 'rxjs/operators';
import { stars } from '../../mock/stars';
import { Star } from '../../models/star.model';

const localUrl = 'http://161.35.5.244:1338/estudiantes';
@Injectable({
  providedIn: 'root'
})
export class StarsApi{

    constructor(private http:HttpClient){
        this.getStars();
    }

    public getStarsTotal(){      
        return stars;
    }

    public getStars(){
      
      return this.http
             .get(localUrl)
             .pipe(
               map((resp:any) => 
                  resp.map(
                    be =>
                      new Star(
                        be.id,
                        be.nombre,
                        be.apellido,
                        '',
                        be.universidad,
                        be.carrera
                      )
                    
                  )
               )
             );
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

 //Retorna la lista filtrada sino toda la lista
 private getFilteredList(query: string | Map<string, string>) {
  if (typeof query === 'string') {
    return stars.filter(p => p.nombre.includes(query));
  }
  if (query instanceof Map) {
    return stars;
  }
}
  getPage(page:number ,pageSize:number ,query:string | Map<string,string>){
    const filteredList = this.getFilteredList(query);
    
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