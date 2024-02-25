import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Member } from 'src/app/models/member';
import { Partner } from 'src/app/models/partner';
import { ActivitiesService } from 'src/app/services/activities.service';
import { MembersService } from 'src/app/services/members.service';
import { PartnersService } from 'src/app/services/partners.service';
import { environment } from 'src/environments/environment';
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  api : string = environment.api;
  numberOfMembers!: number;
  numberOfActivities!: number;
  activities!: Activity[];
  numberOfPatners!: number;
  partners!: Partner[];

  constructor(private _membersService : MembersService,private _activitiesService : ActivitiesService, private _partnersService : PartnersService) { }

  ngOnInit(): void {
    this._membersService.numberOfMembers$.subscribe(
      (numberOfMembers : number)=>{
        this.numberOfMembers = numberOfMembers;
      }
    )

    this._activitiesService.activities$.subscribe(
      (activities : Activity[])=>{
        this.activities = activities.slice(0,4)
        console.log(activities.slice(0,4))
      }
    )

    this._activitiesService.numberOfActivities$.subscribe(
      (numberOfActivities : number)=>{
        this.numberOfActivities = numberOfActivities;
      }
    )

    this._partnersService.numberOfPatners$.subscribe(
      (numberOfPatners : number)=>{
        this.numberOfPatners = numberOfPatners;
      }
    )

    this._partnersService.partners$.subscribe(
      (partners : Partner[])=>{
        this.partners = partners
      }
    )

    // setTimeout(() => {
    //   $(".owl-carousel").owlCarousel();
    // }, 1000);
    // $(".owl-carousel").owlCarousel();

    setTimeout(()=>{
      $('.owl-carousel').owlCarousel({
          autoWidth :true,
          loop: true,
          nav: false,
          dots: false,
          autoplayHoverPause: true,
          autoplay: true,
          margin: 30,
          // navText: [
          //     "<i class='bx bx-chevron-left'></i>",
          //     "<i class='bx bx-chevron-right'></i>"
          // ],
          responsive: {
              0: {
                  items: 1,
              },
              576: {
                  items: 1,
              },
              768: {
                  items: 2,
              },
              992: {
                  items: 3,
              }
          }
      });
      }, 1000);
  }

}
