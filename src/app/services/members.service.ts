import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private api : string = environment.api+"/api";
  members!: Member[];
  members$ = new BehaviorSubject<Member[]>([]);
  numberOfMembers!: number;
  numberOfMembers$ = new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient) {
    this.getNumberOfMembers()
  }

    /**
   * Emettre
   */
    emit(){
      this.numberOfMembers$.next(this.numberOfMembers)
    }

    /**
     * Ajouter un objet
     * @param object
     * @returns
     */
    add(member : Member,cv?: any){
      return new Promise<string>((resolve, reject) => {
        const memberData = new FormData();
        memberData.append('data', JSON.stringify(member.attributes));
      if (cv) {
        memberData.append(`files.cv`, cv, 'CV_'+member.attributes.email);
      }
        this._http.post(this.api+'/members',memberData).subscribe(
          (res : any)=>{
            // this.getNumberOfMembers()
            // res contient l'objet ajouté
            resolve('Votre demande a été effectuée avec succès !')
          },
          (error)=>{
            console.log(error)
            const message = error.error.error.message
            if (message == 'This attribute must be unique') {
              reject("L'adresse email est déja utilisée.")
            } else {
              reject(message)
            }

          }
        )
      })
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
    getNumberOfMembers(){
      this._http.get(this.api+'/members?filters[verified][$eq]=oui',
      ).subscribe(
        (res : any)=>{
          // console.log(data)
          this.numberOfMembers = res.meta.pagination.total
          // this.numberOfMembers = numberOfMembers.data.filter((x : any )=> x.attributes.verified == 'oui' ).length
          // console.log(this.numberOfMembers)
          this.emit()
        },
        (error : any)=>{

        }
      )
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
