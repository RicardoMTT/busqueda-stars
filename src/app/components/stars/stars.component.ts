import { Component, OnInit } from '@angular/core';
import { StarService } from '../../services/star.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { starsListAnimation } from './stars-list.animation';
import { universities } from '../../mock/universities';
import { StarsQuery } from 'src/app/core/stores/stars/stars.query';

const PAGE_SIZE = 6;

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
  esUniversidad: boolean = false;
  paginacionTotal:any[];
  universidades: any[] = universities;

  form = new FormGroup({
    universidad: new FormControl(this.universidades[4])
  });

  searchFC = new FormControl('');
  searchFCU = new FormControl('');

  constructor(
    private svcStar: StarService,
    private router: Router,
    public dialog: MatDialog,
    public starQuery: StarsQuery,
  ) {}

  ngOnInit(): void {
    this.svcStar.getStars();
  }

  //paged query
  currentPage = 1;
  pageSize = 6;
  hasReachedLimit = false;
  getPageAndConcatToCurrentList(page: number) {
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


  showNextPage() {
    this.svcStar.loadStars(
      this.starQuery.getStarsListUI().query,
    );
  }
  

  buttonStyle() {
    return {
      background: !this.hasReachedLimit
        ? 'rgb(101, 243, 101)'
        : 'rgb(247, 176, 162)'
    };
  }
}


 /*
 
  buscarStar() {
    let termino: string = this.searchFC.value;
    this.router.navigate(['/resultado', termino]);
  }
  
  buscarStar(termino:string){
    this.router.navigate(['/resultado',termino]);
  } 

  verMas() {
    this.inicio = this.inicio + 1;
    if (this.inicio == 1) {
      this.stars = this.svcStar.getStars(this.inicio);
      this.lleno = true;
    }
  }*/
  /** 
  openDialog(i) {
    var starrr = this.svcStar.getStar(i);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        image: starrr.image
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
    });
  }*/
  
     //this.paginacion = (this.svcStar.getStars().length/6);
     //this.paginacionTotal = this.svcStar.getStars().slice(0,this.paginacion);


       
/** 
    this.searchFC.valueChanges.pipe(debounceTime(1200)).subscribe(val => {
      this.stars = [];
      this.currentPage = 1;
      this.getPageAndConcatToCurrentListStar(this.currentPage);
    });

    this.searchFCU.valueChanges.pipe(debounceTime(1200)).subscribe(val => {
      this.stars = [];
      this.currentPage = 1;
      this.getPageAndConcatToCurrentList(this.currentPage);
    });

    this.form.valueChanges.pipe().subscribe(val => {
      this.stars = [];
      this.currentPage = 1;
      this.getPageAndConcatToCurrentListSelect(this.currentPage);
    });




    
  getPageAndConcatToCurrentListSelect(page: number) {
    const pageResult = this.svcStar.getPageUniverisdad(
      page,
      this.pageSize,
      this.form.value.universidad
    );
    this.stars = this.stars.concat(pageResult.result);
    if (this.form.value.universidad === '') {
      this.esUniversidad = false;
    } else {
      this.esUniversidad = true;
    }
    this.hasReachedLimit = pageResult.hasReachedLimit;
    this.currentPage = page;
  }
  
  showNextPageSelect() {
    this.getPageAndConcatToCurrentListSelect(this.currentPage + 1);
  }
*/