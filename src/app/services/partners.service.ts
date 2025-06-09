import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Partner } from '../models/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  private api: string = environment.api + '/api';
  partners!: Partner[];
  partners$ = new BehaviorSubject<Partner[]>([]);
  numberOfPatners!: number;
  numberOfPatners$ = new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient) {
    this.getNumberOfMembers();
    this.getAll();
  }

    /**
     * Récuperer des objets
     */
    getNumberOfMembers(){
      this._http.get(this.api + '/partners').subscribe(
        (res: any) => {
          this.numberOfPatners = res.meta.pagination.total;
          console.log(this.numberOfPatners);
          this.emit();
        },
        (error: any) => {

        }
      );
    }

    /**
   * Emettre
   */
    emit(){
      this.numberOfPatners$.next(this.numberOfPatners);
    }

    /**
     * Ajouter un objet
     * @param object
     * @returns
     */
    // add(object : any){
    //   return new Promise<string>((resolve, reject) => {
    //     this._http.post(this.api+'/create',object).subscribe(
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
    getAll(){
      this._http.get(this.api + '/partners?populate=*&sort=createdAt:desc').subscribe(
        (res: any) => {
          this.partners = res.data;
          this.partners$.next(this.partners);
          this.emit();
        },
        (error: any) => {

        }
      );
    }

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
