import { ID } from '@datorama/akita';

export class University {
    id?: ID;  
    nombre?: string;
    constructor(id,nombre){
      this.id = id;
      this.nombre = nombre; 
    }
  }
  