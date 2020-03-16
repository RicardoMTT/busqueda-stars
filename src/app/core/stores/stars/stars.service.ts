import { Injectable } from '@angular/core';
import { StarsStore } from './stars.store';


@Injectable({
  providedIn:'root'
})
export class StarServiceState {

  constructor(private starsStore: StarsStore) {}

  updateFilter(){
      this.starsStore.update({
        filtro:'actualizado'
      })
      console.log('VALOR',this.starsStore.getValue().filtro);
      
  }
}