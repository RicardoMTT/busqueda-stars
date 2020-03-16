import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Star } from './stars.model';

export interface StarsState extends EntityState<Star>{
    filtro:string;
}

/*
    El store es un objeto que contiene el estado del store
    y sirve como la unica fuente de verdad
*/
@StoreConfig({  name : 'stars'  })
@Injectable({providedIn:'root'})
export class StarsStore extends EntityStore<StarsState> {
    
    starStore:Star[] = [];

    constructor() {
        super({
            filtro:'ALL'
        });        
    }
}
