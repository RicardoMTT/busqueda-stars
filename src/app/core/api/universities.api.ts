import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { universities } from '../../mock/universities';

@Injectable({
  providedIn: 'root'
})
export class UniversityApi {

  public getUniversity() {
    const totalList = this.getUniversities();
    return timer(1000).pipe(
      mapTo({
        data: totalList
      })
    );
  }

  public getUniversities() {
    return universities;
  }
}