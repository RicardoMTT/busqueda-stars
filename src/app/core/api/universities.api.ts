import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { universities } from '../../mock/universities';

@Injectable({
  providedIn: 'root'
})
export class UniversityApi{

    public getUniversity(){
      const totalList = this.getUniversities();
      console.log('total list',totalList);
      
      return timer(1000).pipe(
        mapTo({
            data: totalList
        })
    ); 
    }
    public getUniversities(query?) {
        if (typeof query === 'string') {
          return universities.filter(p => p.nombre.includes(query));
        }else{
          return universities;

        }
    }
}