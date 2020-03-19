import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StarsStore } from './stars.store';
import { Starstate } from './stars.state';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StarsQuery extends QueryEntity<Starstate>{
    page$ = this.select(state => state.ui.starsList.pageIds).pipe(
        switchMap(pageIds => this.selectMany(pageIds))
      );
    /*
        Una query es una clase que ofrece la funcionalidad 
        de consultar la store, la store representa a nuestra bd.
        Casi todos los metodos de query devolveran un OBSERVABLE
    */
    constructor(protected store:StarsStore ){
        super(store);
        this.page$.subscribe((value) => {
            console.log('queryyy');
            console.log(value)
        })
    }

   getStarsList(){
       return this.getValue().ui.starsList;
   }


}