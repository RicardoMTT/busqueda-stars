import { Injectable } from '@angular/core';
import { UniversitiesStore } from './universities.store';
import { Universitystate } from './universities.state';
import { QueryEntity } from '@datorama/akita';
import { switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UniversitiesQuery extends QueryEntity<Universitystate> {

      universities$ = this.selectAll();

      page$ = this.select(state => state.ui.universitiesList.pageIds).pipe(
        switchMap(pageIds => this.selectMany(pageIds))
      );

     
      /*
            Una query es una clase que ofrece la funcionalidad 
            de consultar la store, la store representa a nuestra bd.
            Casi todos los metodos de query devolveran un OBSERVABLE
        */
      constructor(protected store: UniversitiesStore) {          
        super(store);
      }
    
}