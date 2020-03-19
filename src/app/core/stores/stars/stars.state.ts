import { EntityState, ID } from '@datorama/akita';
import { Star } from '../../../models/star.model';

export interface Starstate extends EntityState<Star> {
  ui: {
    starsList: {
      currentPage: number;
      pageSize: number;
      hasReachedLimit: boolean;
      pageIds: ID[];
    };
  };
}
