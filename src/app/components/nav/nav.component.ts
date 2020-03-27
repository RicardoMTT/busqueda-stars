import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  searchFG: FormGroup;
  universidades: any[] = universities;

  constructor(
    private fb: FormBuilder,
    public universityService: UniversityService,
    public universitiesQuery: UniversitiesQuery,
    public starsService: StarService
  ) {
    this._buildForm();
    this._initFormListeners();
  }

  ngOnInit(): void {
    this.universityService.loadUniversities();
  }

  private _buildForm() {
    this.searchFG = this.fb.group({
      nombre: '',
      universidad: null
    });
  }

  private _initFormListeners() {
    this.searchFG
      .get('nombre')
      .valueChanges.pipe(
        debounceTime(300),
        tap(val => {
          this._applyFilters();
        })
      )
      .subscribe();
    this.searchFG
      .get('universidad')
      .valueChanges.pipe(
        tap(val => {
          this._applyFilters();
        })
      ) 
      .subscribe();
  }

  _applyFilters() {
    const name = this.searchFG.get('nombre').value;
    const universidad = this.searchFG.get('universidad').value;
    this.starsService.applyFiltersToStarsList(
      name,
      universidad ? universidad.id : null
    );
  }

 
}
