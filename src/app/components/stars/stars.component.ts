import { Component, OnInit } from '@angular/core';
import { StarService } from '../../services/star.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { starsListAnimation } from './stars-list.animation';

import { StarsQuery } from '../../core/stores/stars/stars.query';

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

  searchFC = new FormControl('');
  searchFCU = new FormControl('');

  constructor(
    private svcStar: StarService,
    private router: Router,
    public dialog: MatDialog,
    private starQuery:StarsQuery,
  ) {}

  ngOnInit(): void {
    
    
   // this.svcStar.loadStars();
  // this.stars =  this.starQuery.getStars();//Usando Query para sacar data del Store    

    this.getPageAndConcatToCurrentListStar(this.currentPage);
   //debounceTime:solicitará API solo después de un intervalo de tiempo específico.
    this.searchFC.valueChanges.pipe(debounceTime(1200)).subscribe(val => {
      //this.buscarStar();      
      this.stars = [];
      this.currentPage = 1;
      this.getPageAndConcatToCurrentListStar(this.currentPage);
    });

    this.searchFCU.valueChanges.pipe(debounceTime(1200)).subscribe(val =>{
      this.stars = [];
      this.currentPage = 1;
      this.getPageAndConcatToCurrentList(this.currentPage);
    });
   
    
   
  }

  buscarStar() {
    let termino: string = this.searchFC.value;
    console.log(termino);
    this.router.navigate(['/resultado', termino]);
  }

  /*buscarStar(termino:string){
    this.router.navigate(['/resultado',termino]);
  } 
*/
  verMas() {
    this.inicio = this.inicio + 1;
    if (this.inicio == 1) {
      this.stars = this.svcStar.getStars(this.inicio);
      this.lleno = true;
    }
  }
  openDialog(i) {
    console.log('index', i);
    var starrr = this.svcStar.getStar(i);
    console.log(starrr);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        image: starrr.image
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      console.log('xd', resp);
    });
  }

  //paged query
  currentPage = 1;
  pageSize = 6;
  hasReachedLimit = false;
  getPageAndConcatToCurrentList(page: number) {
    this.stars = [];
    const pageResult = this.svcStar.getPageUniverisdad(page, this.pageSize,this.searchFCU.value);
    this.stars = this.stars.concat(pageResult.result);
        
    this.hasReachedLimit = pageResult.hasReachedLimit;
    this.currentPage = page;
  }

  getPageAndConcatToCurrentListStar(page: number) { 
    const pageResult = this.svcStar.getPage(page, this.pageSize,this.searchFC.value);    
    console.log('INICIO',pageResult);
    
    this.stars = this.stars.concat(pageResult.result);
    console.log('FIN',pageResult);

    
    this.hasReachedLimit = pageResult.hasReachedLimit;
    this.currentPage = page;
  }

  showNextPage() {
    this.getPageAndConcatToCurrentList(this.currentPage + 1);
  }

  buttonStyle() {
    return {
      background: !this.hasReachedLimit
        ? 'rgb(101, 243, 101)'
        : 'rgb(247, 176, 162)'
    };
  }
}
