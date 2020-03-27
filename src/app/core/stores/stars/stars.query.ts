import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StarsStore } from './stars.store';
import { Starstate } from './stars.state';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StarsQuery extends QueryEntity<Starstate> {

  starsDisabledMore$ = combineLatest([
    this.selectLoading(),
    this.select(state => state.ui.starsList.hasReachedLimit)
  ]).pipe(map(([loading, hasReachedLimit]) => loading || hasReachedLimit));

  page$ = this.select(state => state.ui.starsList.pageIds).pipe(
    switchMap(ids => this.selectMany(ids))
  );

  pagination$ = this.select(state => state.ui.starsList.pagesNumbers)
    .pipe(
      map(valor => {
        return Array(valor).fill(1).map((_, index) => index + 1)
      })
    );

  currentPage$ = this.select(state => state.ui.starsList.currentPage)
    .pipe(
      map(valor => {
        return valor;
      })
    );


  getStarsListUI() {
    return this.getValue().ui.starsList;
  }

  constructor(protected store: StarsStore) {
    super(store);
  }

}
