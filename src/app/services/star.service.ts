import { Injectable } from '@angular/core';

import { stars } from '../mock/stars';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  starsSix: any[] = [];
  stars: any[] = stars;

  constructor() {}

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

  getPage(page: number, pageSize: number) {
    const totalList = this.stars;
    const pageIndexStart = (page - 1) * pageSize;
    const pageIndexEnd = pageIndexStart + pageSize;
    return {
      result: totalList.slice(pageIndexStart, pageIndexEnd),
      hasReachedLimit: pageIndexEnd >= totalList.length - 1
    };
  }
}
