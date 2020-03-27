import { Injectable } from '@angular/core';
import { StarsStore } from '../core/stores/stars/stars.store';
import { StarsQuery } from '../core/stores/stars/stars.query';
import { StarsApi } from '../core/api/stars.api';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StarService {
  constructor(
    private starStore: StarsStore,
    private starsApi: StarsApi,
    private starsQuery: StarsQuery
  ) {}


  public showNextPagesvc(
    page: number,
    pageSize: number,
    query: string,
  ){
    this.starsApi.getPage(page,pageSize,query)
        .pipe(
          tap((result:any)=> this.starStore.upsertMany(result.data))
        )      
  }

  public loadStarsAndApplyDefaultFilters() { 
    this.starStore.setLoading(true);
    this.starsApi
      .getStarHttp() 
      .pipe( 
        tap((result: any) => {
          this.starStore.upsertMany(result);
        }),
        tap(_ => this.starStore.setLoading(false)),
        tap(() => {
          this.applyFiltersToStarsList('', null); 
        })
      )
      .subscribe();
  }

  applyFiltersToStarsList(name: string, universityId: any) { 
    this._getPageAndSetStore(1, { 
      nombre: name, 
      universidadId: universityId
    });
  }

  public goToPage(pageNumber: number){    
    const { query } = this.starsQuery.getStarsListUI();
    this._getPageAndSetStore(pageNumber,query);
  }
  
  private _getPageAndSetStore(
    targetPage: number,
    query: string | { [fiter: string]: string }
  ) {
    const { pageIds } = this.starsQuery.getStarsListUI();     
    this.starsApi 
      .getPage(targetPage, 6, query)   
      .pipe(
        tap(({ data, count }) => {
           const newPagesIds = data.map(e => e.id);           
           const pageNumbers = Math.ceil(newPagesIds.length/6);                      
          /** 
           const newPagesIds = [
            ...(targetPage === 1 ? [] : pageIds),
            ...data.map(e => e.id)
          ];
           */
          this.starStore.updateList({
            currentPage: targetPage,
            hasReachedLimit: newPagesIds.length === count,
            pageIds: newPagesIds,
            query,
            pagesNumbers:pageNumbers
          });
        })
      )
      .subscribe();
  }

  public getAllStars() {
    this.starStore.setLoading(true);
    this.starsApi
      .getStarHttp()
      .pipe(
        tap((result: any) => {
         return result;
        })
      )
      .subscribe();
  }

  showMoreInStarsList() {
    const { currentPage, query } = this.starsQuery.getStarsListUI();
    const targetPage = currentPage + 1;   
    this._getPageAndSetStore(targetPage, query);
  }


}








