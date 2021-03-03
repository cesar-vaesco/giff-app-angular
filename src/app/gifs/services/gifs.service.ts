import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {

    //Acegurar que el dato sea registrado con minusculas
    query = query.trim().toLowerCase();

    //Validar que un elemento de un arreglo no se repita y así evitar egistro duplicado
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      // Crece el arreglo solomanete si se agrea un nuevo elemento al mismo
      this._historial = this._historial.splice(0, 10);
    }

    console.log(this.historial);
  }
}
