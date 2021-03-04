import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  /**  Atributos de la clase */
  private apiKey: string = '9OnP9ScBFo7lVnqAxfm0BKnezDQJw1Hb';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  /** Métodos  */
  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    // resultados
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

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

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query);

    console.log(params.toString());

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
