import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private apiKey: string = '9OnP9ScBFo7lVnqAxfm0BKnezDQJw1Hb';
  private _historial: string[] = [];

//   TODO: cambiar any por su tipo correspondiente
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  buscarGifs(query: string = '') {
    //Acegurar que el dato sea registrado con minusculas
    query = query.trim().toLowerCase();

    //Validar que un elemento de un arreglo no se repita y así evitar egistro duplicado
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      // Crece el arreglo solomanete si se agrea un nuevo elemento al mismo
      this._historial = this._historial.splice(0, 10);
    }
    this.http
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=10`
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });

  }
}
