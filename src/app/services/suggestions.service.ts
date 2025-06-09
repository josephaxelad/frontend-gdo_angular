import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Suggestion } from '../models/suggestion';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private api: string = environment.api + '/api';
  suggestions!: Suggestion[];
  suggestions$ = new BehaviorSubject<Suggestion[]>([]);

  constructor(private _http: HttpClient) { }

    /**
   * Emettre
   */
    emit(){
      this.suggestions$.next(this.suggestions);
    }

    /**
     * Ajouter un objet
     * @param object
     * @returns
     */
    add(suggestion: Suggestion){
      return new Promise<string>((resolve, reject) => {
        this._http.post(this.api + '/suggestions', {data : suggestion.attributes}).subscribe(
          (res: any) => {
            resolve('Votre suggesion a été envoyée avec succès !');
          },
          (error) => {
            reject(error.error.error.message);

          }
        );
      });
    }

    /**
     * Modifier un objet
     * @param object
     * @returns
     */
    // modify(object : any){
    //   return new Promise<string>((resolve, reject) => {
    //     this._http.put(this.api+'/modify/'+object._id,object).subscribe(
    //       (res : any)=>{
    //         this.getAll()
    //         resolve(res.message)
    //       },
    //       (error)=>{
    //         reject(error.error)
    //       }
    //     )
    //   })
    // }

    /**
     * Récuperer des objets
     */
    // getAll(){
    //   this._http.get(this.api+'/getAll/').subscribe(
    //     (objects : any)=>{
    //       this.objects = objects
    //       this.emit()
    //     },
    //     (error : any)=>{

    //     }
    //   )
    // }

    /**
     * Supprimer définitivement
     * @param id
     * @returns
     */
    // delete(id : string){
    //   return new Promise<string>((resolve, reject) => {
    //     this._http.delete(this.api+'/deleteHard/'+id).subscribe(
    //       (res : any)=>{
    //         this.getAll()
    //         resolve(res.message)
    //       },
    //       (error)=>{
    //         reject(error.error)
    //       })
    //   })
    // }
}
