import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StarsState,StarsStore } from './stars.store';

@Injectable({ providedIn: 'root' })
export class StarsQuery extends QueryEntity<StarsState>{
    
    /*
        Una query es una clase que ofrece la funcionalidad 
        de consultar la store, la store representa a nuestra bd.
        Casi todos los metodos de query devolveran un OBSERVABLE
    */
    constructor(protected store:StarsStore ){
        super(store);
    }

   getStars(){
       return this.getAll();
   }


}