import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarService {

    starsSix:any[] = [];
    starss:any[] = [
      {
        nombre:"daniel",
        apellido:"Gomez",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
      },
      {
        nombre:"ricardo",
        apellido:"Tovar",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
  
      },
      {
        nombre:"josue",
        apellido:"Estada",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
      },
      {
        nombre:"airton",
        apellido:"Gomez",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
  
      },
      {
        nombre:"daniel",
        apellido:"Gomez",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
      },
      {
        nombre:"manuel",
        apellido:"Garcia",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
  
      },
      {
        nombre:"daniel",
        apellido:"Gomez",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
      },
      {
        nombre:"edson",
        apellido:"Tapia",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
  
      },
      {
        nombre:"arnold",
        apellido:"rios",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
      },
      {
        nombre:"francoo",
        apellido:"garcia",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
  
      },
    
      {
        nombre:"andre",
        apellido:"Gomezr",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
      },
      {
        nombre:"mijail",
        apellido:"gonzales",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
  
      },
    
      {
        nombre:"adrian",
        apellido:"tapia",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
      },
      {
        nombre:"jose",
        apellido:"Torre",
        image:"https://www.realmadrid.com/img/vertical_380px/carvajal_380x501_20191221090919.jpg"
  
      },
      
  ]
  constructor() { }

  public getStars(inicio){
    this.starsSix = [];
    let inicio1 = inicio + 1 ;
    for(let i=0 ; i<inicio1*6; i++){
      if(this.starss[i] === undefined){
        return [];
      }
      this.starsSix.push(this.starss[i]);
    }
    return this.starsSix;
  }

  getStar(index){
    return this.starss[index];
  }

  buscarStar(termino:string):any[]{
    let StarArray:any[]= [];//Sera un array por que puede que coincidan con mas de uno
    termino = termino.toLowerCase();//pasamos el termino a minuscula  
    for(let star of this.starss){      
      let nombre = star.nombre;      
      if(nombre.localeCompare(termino)===0){//Devuelve 0 si son iguales
        StarArray.push(star);
      }
    }    
    return StarArray;
  }
}
