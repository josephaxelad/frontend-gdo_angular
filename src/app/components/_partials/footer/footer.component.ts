import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
