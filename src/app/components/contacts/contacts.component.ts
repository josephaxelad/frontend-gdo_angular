import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuggestionsService } from 'src/app/services/suggestions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  suggestionForm!: FormGroup;
  submitted = false;
  emailPattern = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  // "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  socialNetworkLink: {
    tiktok: string,
    linkedin: string,
    facebook: string,
    instagram: string
  } = environment.socialNetworkLink;

  constructor(private _fb: FormBuilder, private _alertsService: AlertsService, private _suggestionsService: SuggestionsService ) { }

  ngOnInit(): void {
    this.suggestionForm = this._fb.group({
      name : this._fb.control('', Validators.required),
      email : this._fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      object : this._fb.control('', Validators.required),
      message : this._fb.control('', Validators.required),
    });
  }

  add(){
    this.submitted = true;
    if (this.suggestionForm.valid) {

      const name = this.suggestionForm.get('name')?.value;
      const email = this.suggestionForm.get('email')?.value;
      const object = this.suggestionForm.get('object')?.value;
      const message = this.suggestionForm.get('message')?.value;

      const suggestion = {
        attributes : {
          name,
          email,
          object,
          message,
        }
      };

      this._suggestionsService.add(suggestion)
      .then((message) => {
        this.submitted = false;
        this.suggestionForm.reset();
        this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
        // this._router.navigate(["/parametres/villes"])
      })
      .catch((error) => {
        this.submitted = false;
        this._alertsService.error(error,
          {
            autoClose: true,
            keepAfterRouteChange: true,
          });
        // this._alertsService.error(error.message,
        //   {
        //     autoClose: true,
        //     keepAfterRouteChange: false,
        //   })
      });
    }
  }

}
