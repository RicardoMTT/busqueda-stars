import { Injectable, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UniversitiesStore } from '../core/stores/universities/universities.store';
import { UniversityApi } from '../core/api/universities.api';

@Injectable({
    providedIn: 'root'
  })
  export class UniversityService implements OnInit {
    starsApi: any;
  
    constructor(
        private universityStore:UniversitiesStore,
        private universityApi:UniversityApi
    ) {
    }
    ngOnInit(): void {
        
    }
  
  
    public loadUniversities(){    
      
      this.universityStore.setLoading(true);
      this.universityApi.getUniversity()
      .pipe(
        tap((result:any) => {
          //Metodo set es para meter data completa, si meto data y en el store existe data
          //entonces los borra y mete la nueva data.
          this.universityStore.set(result.data)
        }),
        tap(_ => this.universityStore.setLoading(false)),
        tap(result => {
            console.log(result);
        })
      ).subscribe();
    }
    
  
   
  
}  