import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  /**  Atributos de la clase */
  private apiKey: string = '9OnP9ScBFo7lVnqAxfm0BKnezDQJw1Hb';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  /** Métodos  */
  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // if(localStorage.getItem('historial') ){
    //     this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string = '') {
    //Asegurar que el dato sea registrado con minusculas
    query = query.trim().toLowerCase();

    //Validar que un elemento de un arreglo no se repita y así evitar egistro duplicado
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      // Crece el arreglo solomanete si se agrea un nuevo elemento al mismo
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
