import { Injectable } from '@angular/core';
import { stars } from '../mock/stars';
import { StarsStore } from '../core/stores/stars/stars.store';
import { Star } from '../models/star.model';
import { StarsQuery } from '../core/stores/stars/stars.query';
import { StarsApi } from '../core/api/stars.api';
import { tap } from 'rxjs/operators';
import { UniversitiesStore } from '../core/stores/universities/universities.store';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  starsSix: any[] = [];
  stars: Star[] = [];

  constructor(
    private starStore: StarsStore,
    private starsApi: StarsApi,
    private starsQuery: StarsQuery,
    private universityStore: UniversitiesStore
  ) {}

  public loadStarsSelect(query: string) {
    this.starStore.setLoading(true);

    this.starsApi
      .getPageUniversity(query)
      .pipe(
        tap((result: any) => {
          this.starStore.upsertMany(result.data);
        }),
        tap(_ => this.starStore.setLoading(false)),
        tap(result => {})
      )
      .subscribe();
  }

  public loadStars() {
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

  public getStars() {
    this.starsApi
      .getStars()
      .pipe(
        tap(result => {
          this.starStore.set(result);
        }),
        tap(_ => this.starStore.setLoading(false)),
        catchError(error => {
          console.log(error);
          return null;
        })
      )
      .subscribe();
  }

  getStar(index) {
    return this.stars[index];
  }

  buscarStar(termino: string): any[] {
    let StarArray: any[] = []; //Sera un array por que puede que coincidan con mas de uno
    termino = termino.toLowerCase(); //pasamos el termino a minuscula
    for (let star of this.stars) {
      let nombre = star.nombre;
      if (nombre.localeCompare(termino) === 0) {
        //Devuelve 0 si son iguales
        StarArray.push(star);
      }
    }
    return StarArray;
  }

  getPageUniverisdad(page: number, pageSize: number, query: string = '') {
    const totalList = this.stars.filter(star => {
      return star.universidad.includes(query);
    });
    const pageIndexStart = (page - 1) * pageSize;
    const pageIndexEnd = pageIndexStart + pageSize;
    return {
      result: totalList.slice(pageIndexStart, pageIndexEnd),
      hasReachedLimit: pageIndexEnd >= totalList.length - 1
    };
  }

  //1,6, ricardo
  getPage(page: number, pageSize: number, query: string = '') {
    const totalList = this.stars.filter(star => {
      //es un objeto de la lista de stars

      return star.nombre.includes(query);
    });

    const pageIndexStart = (page - 1) * pageSize; //0
    const pageIndexEnd = pageIndexStart + pageSize; //6
    return {
      result: totalList.slice(pageIndexStart, pageIndexEnd), //Los 6 elementos del arreglo
      hasReachedLimit: pageIndexEnd >= totalList.length - 1
    };
  }

  private _getPageAndSetStore(
    targetPage: number,
    query: string | { [fiter: string]: string }
  ) {
    const { pageIds } = this.starsQuery.getStarsListUI();
    this.starsApi
      .getPage(targetPage, 5, query)
      .pipe(
        tap(({ data, count }) => {
          const newPagesIds = [
            ...(targetPage === 1 ? [] : pageIds),
            ...data.map(e => e.id)
          ];
          console.log(newPagesIds);
          this.starStore.updateList({
            currentPage: targetPage,
            hasReachedLimit: newPagesIds.length === count,
            pageIds: newPagesIds,
            query
          });
        })
      )
      .subscribe();
  }

  showMoreInStarsList() {
    const { currentPage, query } = this.starsQuery.getStarsListUI();
    const targetPage = currentPage + 1;
    this._getPageAndSetStore(targetPage, query);
  }

  applyFiltersToStarsList(name: string, universityId: any) {
    this._getPageAndSetStore(1, {
      nombre: name,
      universidadId: universityId
    });
  }
}
