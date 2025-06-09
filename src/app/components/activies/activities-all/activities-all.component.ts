import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activities-all',
  templateUrl: './activities-all.component.html',
  styleUrls: ['./activities-all.component.scss']
})
export class ActivitiesAllComponent implements OnInit {

  api: string = environment.api;
  allActivities: Activity[] = [];
  activities: Activity[] = [];
  activitiesByPage: Activity[] = [];
  numberOfElementToShow = 8;
  currentPage = 1;
  numberTotalOfpage = 0;
  pages: number[] = [];

  constructor(private _activitiesService: ActivitiesService) { }

  ngOnInit(): void {
    this.getAll();
  }

  /**Récuperer les objects */
  getAll(){
    this._activitiesService.activities$.subscribe(
      (activities: Activity[]) => {
        this.allActivities = activities;
        this.activities = activities;
        this.getNumberTotalOfpage();
        this.setPages();
        this.getActivitiesBypage(1);
      }
    );
  }

  // Obtenir le nombre total de pages
  getNumberTotalOfpage(){
    this.numberTotalOfpage = Math.ceil(this.activities?.length / this.numberOfElementToShow);
  }

  setPages(){
    this.pages = [];
    for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
      this.pages.push(i);
    }
  }

  /**Récuperer les object par page*/
  getActivitiesBypage(currentPage: number){
    window.scrollTo(0, 0);
    this.currentPage = currentPage;

    this.activitiesByPage = this.activities?.slice(this.numberOfElementToShow * (currentPage - 1), this.numberOfElementToShow * currentPage);
  }

}
