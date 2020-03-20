import { Universitystate } from './universities.state';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

@StoreConfig({ name: 'universities' })
@Injectable({ providedIn: 'root' })
export class UniversitiesStore extends EntityStore<Universitystate> {
    constructor() {
        super({
          ui: {
            universitiesList: {
              currentPage: 1,
              pageSize: 6,
              hasReachedLimit: false,
              pageIds: []
            }
          }
        });
      }
    
}
