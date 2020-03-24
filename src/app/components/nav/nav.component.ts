import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { StarService } from 'src/app/services/star.service';
import { universities } from 'src/app/mock/universities';
import { UniversityService } from '../../services/university.service';
import { UniversitiesQuery } from '../../core/stores/universities/universities.query';

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
  universidades: any[] = universities;

  form = new FormGroup({
    universidad: new FormControl(this.universidades[4])
  });

  constructor( 
    private router: Router,
    private svcStar: StarService,
    private fb: FormBuilder,    
    public universityService:UniversityService,
    public universitiesQuery:UniversitiesQuery
  ) {    

    this._buildForm();
    this._initFormListeners();
    this._selectResult();
  }

  ngOnInit(): void {  
    this.universityService.loadUniversities();
    this._loadFirstResults();
  }

  private _buildForm() {    
    this.searchFC = this.fb.control('');
  }

 
  private _selectResult(){   

    this.form.valueChanges
      .pipe(
        tap(val => { 
          console.log('entro');
          this.svcStar.loadStarsSelect(val.universidad);
        })
      ).subscribe();
  }
 
  private _initFormListeners() {
    this.searchFC.valueChanges
      .pipe(
        debounceTime(300),
        tap(val => {
          this.svcStar.loadStars(val);
        })
      )
      .subscribe();
  }
  private _loadFirstResults() {        
    this.svcStar.loadStars(this.searchFC.value);
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
    this.router.navigate(['/resultado', termino]);
  }

  cambiarEstado() {
    this.ocultar = !this.ocultar;
  }
}
