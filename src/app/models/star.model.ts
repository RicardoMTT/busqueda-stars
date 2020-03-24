import { ID } from '@datorama/akita';

export class Star {
  id?: ID;
  nombre?: string;
  apellido?: string;
  imagen?: string;
  carrera?: any;
  universidad?: any;
  ranking?: number;

  public constructor(
    id: string,
    nombre: string,
    apellido: string,
    imagen: string,
    carrera: string,
    universidad: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.imagen = imagen;
    this.carrera = carrera;
    this.universidad = universidad;
  }
}
