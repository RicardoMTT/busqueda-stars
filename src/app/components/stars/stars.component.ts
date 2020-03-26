import { Component, OnInit } from '@angular/core';
import { StarService } from '../../services/star.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { starsListAnimation } from './stars-list.animation';
import { universities } from '../../mock/universities';
import { StarsQuery } from 'src/app/core/stores/stars/stars.query';


@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
  animations: [starsListAnimation]
})
export class StarsComponent implements OnInit {
  inicio: number = 0;
  stars: any[] = [];
  lleno: boolean = false;
  paginacionTotal: any[];
  universidades: any[] = universities;

  
  form = new FormGroup({
    universidad: new FormControl(this.universidades[4])
  });

  searchFC = new FormControl('');
  searchFCU = new FormControl('');

  constructor(
    private svcStar: StarService,
    public dialog: MatDialog,
    public starQuery: StarsQuery
  ) { }

  ngOnInit(): void {
    this.svcStar.loadStarsAndApplyDefaultFilters();
  }

  //paged query
  currentPage = 1;
  pageSize = 6;
  hasReachedLimit = false;


  showNextPage(valor) {
    console.log(valor);
    
    this.svcStar.goToPage(valor);
  }

  buttonStyle() {
    var valor1;
    this.starQuery.currentPage$.subscribe((valorrrr) => {
      valor1 = valorrrr;
    });
    if (valor1 === 1) {
      return {
        background: 'black',
        color: 'white'
      }
    }
  }

}

/**
 *
 *
 * getPageAndConcatToCurrentList(page: number) {
    this.stars = [];
    const pageResult = this.svcStar.getPageUniverisdad(
      page,
      this.pageSize,
      this.searchFCU.value
    );
    this.stars = this.stars.concat(pageResult.result);
    this.hasReachedLimit = pageResult.hasReachedLimit;
    this.currentPage = page;
  }

  getPageAndConcatToCurrentListStar(page: number) {
    const pageResult = this.svcStar.getPage(
      page,
      this.pageSize,
      this.searchFC.value
    );
    this.stars = this.stars.concat(pageResult.result);
    this.hasReachedLimit = pageResult.hasReachedLimit;
    this.currentPage = page;
  }
 */