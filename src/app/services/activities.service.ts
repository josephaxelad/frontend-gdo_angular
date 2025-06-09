import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private api: string = environment.api + '/api';
  activities!: Activity[];
  activities$ = new BehaviorSubject<Activity[]>([]);
  numberOfActivities!: number;
  numberOfActivities$ = new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient) {
    this.getAll();
   }

    /**
   * Emettre
   */
    emit(){
      this.activities$.next(this.activities);
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
      this._http.get(this.api + '/activities?populate=*&sort=createdAt:desc').subscribe(
        (res: any) => {
          this.numberOfActivities = res.meta.pagination.total;
          this.numberOfActivities$.next(this.numberOfActivities);
          this.activities = res.data;
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
