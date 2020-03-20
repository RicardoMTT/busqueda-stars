import { Injectable } from '@angular/core';
import { stars } from '../mock/stars';
import { StarsStore } from '../core/stores/stars/stars.store';
import { Star } from '../models/star.model';
import { StarsQuery } from '../core/stores/stars/stars.query';
import { StarsApi } from '../core/api/stars.api';
import { tap } from 'rxjs/operators';
import { UniversitiesStore } from '../core/stores/universities/universities.store';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  starsSix: any[] = [];
  stars: Star[] = [];

  constructor(
    private Starstore: StarsStore,
    private starsApi: StarsApi,
    private starsQuery: StarsQuery,
    private universityStore:UniversitiesStore
  ) {
    this.stars = stars;
  }



  public loadStars(
    page: number,
    pageSize: number,
    query: string,
    resetResults: boolean,
    queryUni?: string
  ) {

    this.Starstore.setLoading(true);
    this.starsApi
      .getPage(page, pageSize, query)
      .pipe(
        tap((result: any) => this.Starstore.upsertMany(result.data)),
        tap(_ => this.Starstore.setLoading(false)),
        tap(result => {

          const pageStarsId = result.data.map(p => p.id);
          const newPageStars = resetResults
            ? [...pageStarsId]
            : [...this.starsQuery.getStarsList().pageIds, ...pageStarsId];
            
          const hasReachedLimit = result.count === newPageStars.length;
          this.Starstore.updateList({
            currentPage: page,
            pageSize,
            hasReachedLimit,
            pageIds: newPageStars,
            query 
          });
        })
      )
      .subscribe();
  }

  public getStars(inicio) {
    this.starsSix = [];
    let inicio1 = inicio + 1;
    for (let i = 0; i < inicio1 * 6; i++) {
      if (this.stars[i] === undefined) {
        return [];
      }
      this.starsSix.push(this.stars[i]);
    }
    return this.starsSix;
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
}
