import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { University } from '../../models/university.model'; 

const localUrl='http://161.35.5.244:1338/universidads';
@Injectable({
  providedIn: 'root'
})
export class UniversityApi {

  constructor(public http:HttpClient){

  }
  public getUniversity() {
    return this.http
    .get(localUrl)
    .pipe(
      map((resp:any) => 
         resp.map(
           be =>
            {
              return new University(
                be.id,
                be.nombre,
              )
            }
         )
      )
    );
  }

}