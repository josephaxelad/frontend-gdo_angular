import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gallerie } from '../models/gallerie';

@Injectable({
  providedIn: 'root'
})
export class GallerieService {

  private api: string = environment.api + '/api';
  gallerie!: Gallerie[];
  gallerie$ = new BehaviorSubject<Gallerie[]>([]);

  constructor(private _http: HttpClient) {
    this.getAll();
  }

  /**
   * Emettre
   */
  emit(){
    this.gallerie$.next(this.gallerie);
  }

  /**
     * Récuperer des objets
     */
  getAll(){
    this._http.get(this.api + '/galleries?populate=*&sort=createdAt:desc').subscribe(
      (res: any) => {
        console.log(res.data);
        this.gallerie = res.data;
        this.emit();
      },
      (error: any) => {

      }
    );
  }
}
