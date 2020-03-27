import { Component, OnInit } from '@angular/core';
import { StarService } from '../../services/star.service';
import { FormControl } from '@angular/forms';
import { starsListAnimation } from './stars-list.animation';
import { StarsQuery } from 'src/app/core/stores/stars/stars.query';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
  animations: [starsListAnimation]
})
export class StarsComponent implements OnInit {
  searchFC = new FormControl('');
  searchFCU = new FormControl('');
  // paged query
  currentPage = 1;
  pageSize = 6;
  hasReachedLimit = false;

  constructor(private starService: StarService, public starQuery: StarsQuery) {}

  ngOnInit(): void {
    this.starService.loadStarsAndApplyDefaultFilters();
  }

  showNextPage(valor) {
    this.starService.goToPage(valor);
  }

  buttonStyle() {
    let valor1;
    this.starQuery.currentPage$.subscribe(valorrrr => {
      valor1 = valorrrr;
    });
    if (valor1 === 1) {
      return {
        background: 'black',
        color: 'white'
      };
    }
  }
}
