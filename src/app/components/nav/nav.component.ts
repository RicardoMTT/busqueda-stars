import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { StarService } from 'src/app/services/star.service';
const PAG_SIZE = 6;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  stars: any[] = [];
  ocultar: boolean = true;
  searchFC: FormControl;

  constructor(
    private router: Router,
    private svcStar: StarService,
    private fb: FormBuilder
  ) {
    this._buildForm();
    this._initFormListeners();
  }

  private _buildForm() {
    this.searchFC = this.fb.control('');
  }

  private _loadFirstResults() {
    this.svcStar.loadStars(1, PAG_SIZE, this.searchFC.value, false);
  }
  private _initFormListeners() {
    this.searchFC.valueChanges
      .pipe(
        debounceTime(300),
        tap(val => {
          this.svcStar.loadStars(1, PAG_SIZE, val, true);
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    this._loadFirstResults();
  }

  //paged query
  currentPage = 1;
  pageSize = 6;
  hasReachedLimit = false;
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

  buscarStar() {
    let termino: string = this.searchFC.value;
    console.log(termino);
    this.router.navigate(['/resultado', termino]);
  }

  cambiarEstado() {
    console.log('click');
    this.ocultar = !this.ocultar;
    console.log(this.ocultar);
  }
}
