import { StoreConfig, EntityStore, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Starstate } from './stars.state';

/*
    El store es un objeto que contiene el estado del store
    y sirve como la unica fuente de verdad
*/ 
@StoreConfig({ name: 'stars' })
@Injectable({ providedIn: 'root' })
export class StarsStore extends EntityStore<Starstate> {
  constructor() {
    super({
      ui: {
        starsList: {
          query: '',
          currentPage: 1,
          pageSize: 6,
          hasReachedLimit: false,
          pageIds: []
        }
      }
    });
  }

  updateList(payload: Starstate['ui']['starsList']) {
    this.update({
      ui: {
        ...this.getValue().ui,
        starsList: payload
      }
    });
  }
}
