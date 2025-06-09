import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityCategory } from 'src/app/models/activity-category';
import { ActivitiesCategoriesService } from 'src/app/services/activities-categories.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdo',
  templateUrl: './cdo.component.html',
  styleUrls: ['./cdo.component.scss']
})
export class CdoComponent implements OnInit {

  api: string = environment.api;
  activities: Activity[] = [];
  allActivities: Activity[] = [];
  categories: ActivityCategory[] = [];
  selectedCat: ActivityCategory|null = null;

  constructor(private _activitiesService: ActivitiesService, private _activitiesCategoriesService: ActivitiesCategoriesService) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllCat();
  }

  /**Récuperer les objects */
  getAll(){
    this._activitiesService.activities$.subscribe(
      (activities: Activity[]) => {
        this.allActivities = activities.filter(act => act.attributes.categorie_de_l_activites.data.map(x => x.id).includes(1));
        this.activities = this.allActivities;
      }
    );
  }

  getAllCat(){
    this._activitiesCategoriesService.categories$.subscribe(
      (categories: ActivityCategory[]) => {
        this.categories = categories.filter(cat =>
          cat.attributes.categorie_de_l_activites.data[0].id == 1
        );
      }
    );
  }

  getByCat(cat: ActivityCategory){
    this.selectedCat = cat;
    this.activities = this.allActivities.filter(activity =>
      activity.attributes.sous_categorie_de_l_activites.data.length &&
        activity.attributes.sous_categorie_de_l_activites.data[0].id == cat.id
    );
  }

}
