import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StarsStore } from './stars.store';
import { Starstate } from './stars.state';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
 
@Injectable({ providedIn: 'root' })
export class StarsQuery extends QueryEntity<Starstate> {
  starsDisabledMore$ = combineLatest([
    this.selectLoading(),
    this.select(state => state.ui.starsList.hasReachedLimit)
  ]).pipe(map(([loading, hasReachedLimit]) => loading || hasReachedLimit));

  page$ = this.select(state => state.ui.starsList.pageIds).pipe(
    switchMap(pageIds => this.selectMany(pageIds))
  );

  getStarsListUI() {
    return this.getValue().ui.starsList;
  }
  /*
        Una query es una clase que ofrece la funcionalidad 
        de consultar la store, la store representa a nuestra bd.
        Casi todos los metodos de query devolveran un OBSERVABLE
    */
  constructor(protected store: StarsStore) {
    super(store);
  }

  getStarsList() {
    return this.getValue().ui.starsList;
  }
}
