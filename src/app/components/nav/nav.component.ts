import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  stars: any[] = [];
  searchFC = new FormControl('');
  ocultar:boolean = true;

  constructor(private router:Router,private svcStar:StarService){}

  ngOnInit(): void {
    this.getPageAndConcatToCurrentListStar(this.currentPage);
    this.searchFC.valueChanges.pipe(debounceTime(1200)).subscribe(val => {
      //this.buscarStar();
      this.stars = [];
      this.currentPage = 1;
      this.getPageAndConcatToCurrentListStar(this.currentPage);
    });
  }

  
  //paged query
  currentPage = 1;
  pageSize = 6;
  hasReachedLimit = false;
  getPageAndConcatToCurrentListStar(page: number) { 
    const pageResult = this.svcStar.getPage(page, this.pageSize,this.searchFC.value);  
    this.stars = this.stars.concat(pageResult.result);    
    this.hasReachedLimit = pageResult.hasReachedLimit;
    this.currentPage = page;
    
  }

  buscarStar(){
    let termino:string = this.searchFC.value;
    console.log(termino);
    this.router.navigate(['/resultado',termino]);
  }

  cambiarEstado(){
    console.log('click');
    this.ocultar = !this.ocultar;
    console.log(this.ocultar);
  }

}
