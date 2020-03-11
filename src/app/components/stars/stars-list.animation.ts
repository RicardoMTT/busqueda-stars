import {
  trigger,
  transition,
  animate,
  state,
  style,
  query,
  stagger
} from '@angular/animations';

export const starsListAnimation = trigger('starsList', [
  transition('*=>*', [
    query(':enter', style({ opacity: 0, transform: 'scale(0.5)' })),
    query(
      ':enter',
      stagger(100, [
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    )
  ])
]);
