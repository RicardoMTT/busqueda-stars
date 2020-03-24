import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { timer, of } from 'rxjs';
import { mapTo, map, filter } from 'rxjs/operators';
import { Star } from '../../models/star.model';
import { StarsQuery } from '../../core/stores/stars/stars.query';

const localUrl = 'http://161.35.5.244:1338/estudiantes';
@Injectable({
  providedIn: 'root'
})
export class StarsApi {
  constructor(private http: HttpClient, private starsQuery: StarsQuery) {
    this.getStars();
  }

  public getStars() {
    return this.http
      .get(localUrl)
      .pipe(
        map((resp: any) =>
          resp.map(
            be =>
              new Star(
                be.id,
                be.nombre,
                be.apellido,
                '',
                be.universidad,
                be.carrera
              )
          )
        )
      );
  }

  public getStarHttp(nombre?: any) {
    return this.http.get(localUrl).pipe(map(resp => resp));
  }

  private getFilteredListUniversity(query: string | Map<string, string>) {
    return null;
  }

  getPageUniversity(query: string | Map<string, string>) {
    const filteredList = this.getFilteredListUniversity(query);
    console.log('universidades', filteredList);

    const startIndex = 0;
    const endIndex = 0;
    return timer(1000).pipe(
      mapTo({
        count: filteredList.length,
        data: filteredList.slice(startIndex, endIndex)
      })
    );
  }

  //Retorna la lista filtrada sino toda la lista
  private getFilteredList(query: string | { [fiter: string]: string }) {
    const stars = this.starsQuery.getAll();
    if (typeof query === 'string') {
      return stars.filter(p => p.nombre.includes(query));
    } else {
      let filteredList = stars;
      console.log({ query, filteredList });
      if (query.nombre) {
        filteredList = filteredList.filter(e =>
          e.nombre.toLowerCase().includes(query.nombre.toLowerCase())
        );
      }
      if (query.universidadId) {
        filteredList = filteredList.filter(
          e => e.universidad.id === query.universidadId
        );
      }
      return filteredList;
    }
  }
  getPage(
    page: number,
    pageSize: number,
    query: string | { [fiter: string]: string }
  ) {
    const filteredList = this.getFilteredList(query);
    console.log(filteredList);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return of({
      count: filteredList.length,
      data: filteredList.slice(startIndex, endIndex)
    });
  }

  getSearch(
    page: number,
    pageSize: number,
    query: string | { [fiter: string]: string }
  ) {
    const filteredList = this.getFilteredList(query);
  }
}
