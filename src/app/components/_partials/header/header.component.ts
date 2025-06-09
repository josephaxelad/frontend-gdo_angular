import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentRoute!: string; // "/actions/coeur-d-or" "/actions/shine-academy"
  socialNetworkLink: {
    tiktok: string,
    linkedin: string,
    facebook: string,
    instagram: string
  } = environment.socialNetworkLink;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {

    this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
      }


  });
   }


  ngOnInit(): void {

  }

}
