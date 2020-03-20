import { EntityState, ID } from '@datorama/akita';
import { University } from './../../../models/university.model';

export interface Universitystate extends EntityState<University> {
  ui: {
    universitiesList: {
      currentPage: number;
      pageSize: number;
      hasReachedLimit: boolean;
      pageIds: ID[];
    };
  };
}
