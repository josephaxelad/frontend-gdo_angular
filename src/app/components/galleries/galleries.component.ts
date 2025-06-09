import { Component, OnInit } from '@angular/core';
import { Gallerie } from 'src/app/models/gallerie';
import { GallerieService } from 'src/app/services/gallerie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {

  api: string = environment.api;
  allGallerie: Gallerie[] = [];
  gallerie: Gallerie[] = [];
  gallerieByPage: Gallerie[] = [];
  numberOfElementToShow = 8;
  currentPage = 1;
  numberTotalOfpage = 0;
  pages: number[] = [];

  constructor(private _gallerieService: GallerieService) { }

  ngOnInit(): void {
    this.getAll();
  }

    /**Récuperer les objects */
    getAll(){
      this._gallerieService.gallerie$.subscribe(
        (gallerie: Gallerie[]) => {
          this.allGallerie = gallerie;
          this.gallerie = gallerie;
          this.getNumberTotalOfpage();
          this.setPages();
          this.getGallerieBypage(1);
        }
      );
    }

    // Obtenir le nombre total de pages
    getNumberTotalOfpage(){
      this.numberTotalOfpage = Math.ceil(this.gallerie?.length / this.numberOfElementToShow);
    }

    setPages(){
      this.pages = [];
      for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
        this.pages.push(i);
      }
    }

    /**Récuperer les object par page*/
    getGallerieBypage(currentPage: number){
      window.scrollTo(0, 0);
      this.currentPage = currentPage;

      this.gallerieByPage = this.gallerie?.slice(this.numberOfElementToShow * (currentPage - 1), this.numberOfElementToShow * currentPage);
    }

    getLength(i: number): boolean{
      if (i == 4 || i == 5) {
        return true;
      } else {
        return false;
      }
    }
}
