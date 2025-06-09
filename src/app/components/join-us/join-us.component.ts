import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { MembersService } from 'src/app/services/members.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit {

  joinUsForm!: FormGroup;
  submitted = false;
  countries = ['Afrique du Sud'	, 'Afghanistan'	, 'Albanie'	, 'Algérie'	, 'Allemagne'	, 'Andorre'	, 'Angola'	, 'Antigua-et-Barbuda'	, 'Arabie Saoudite'	, 'Argentine'	, 'Arménie'	, 'Australie'	, 'Autriche'	, 'Azerbaïdjan'	, 'Bahamas'	, 'Bahreïn'	, 'Bangladesh'	, 'Barbade'	, 'Belgique'	, 'Belize'	, 'Bénin'	, 'Bhoutan'	, 'Biélorussie'	, 'Birmanie'	, 'Bolivie'	, 'Bosnie-Herzégovine'	,
'Botswana'	, 'Brésil'	, 'Brunei'	, 'Bulgarie'	, 'Burkina Faso'	, 'Burundi'	, 'Cambodge'	, 'Cameroun'	, 'Canada'	, 'Cap-Vert'	, 'Chili'	, 'Chine'	, 'Chypre'	, 'Colombie'	, 'Comores'	, 'Corée du Nord'	, 'Corée du Sud'	, 'Costa Rica'	, 'Côte d’Ivoire'	, 'Croatie'	, 'Cuba'	, 'Danemark'	, 'Djibouti'	, 'Dominique'	, 'Égypte'	, 'Émirats arabes unis'	, 'Équateur'	, 'Érythrée'	, 'Espagne'	, 'Eswatini'	, 'Estonie'	, 'États-Unis'	, 'Éthiopie'	, 'Fidji'	, 'Finlande'	, 'France'	, 'Gabon'	, 'Gambie'	, 'Géorgie'	, 'Ghana'	, 'Grèce'	, 'Grenade'	, 'Guatemala'	, 'Guinée'	, 'Guinée équatoriale'	, 'Guinée-Bissau'	, 'Guyana'	, 'Haïti'	, 'Honduras'	, 'Hongrie'	, 'Îles Cook'	, 'Îles Marshall	', 'Inde'	, 'Indonésie'	, 'Irak'	, 'Iran'	, 'Irlande'	, 'Islande'	, 'Israël'	, 'Italie'	, 'Jamaïque'	, 'Japon'	, 'Jordanie'	, 'Kazakhstan'	, 'Kenya'	, 'Kirghizistan'	, 'Kiribati'	,
'Koweït'	, 'Laos'	, 'Lesotho'	, 'Lettonie'	, 'Liban'	, 'Liberia'	,
'Libye'	, 'Liechtenstein'	, 'Lituanie'	, 'Luxembourg'	, 'Macédoine'	, 'Madagascar'	, 'Malaisie'	, 'Malawi'	, 'Maldives'	, 'Mali'	, 'Malte'	, 'Maroc'	, 'Maurice' , 'Mauritanie'	, 'Mexique'	, 'Micronésie'	, 'Moldavie'	, 'Monaco'	, 'Mongolie'	, 'Monténégro'	, 'Mozambique'	, 'Namibie'	, 'Nauru'	, 'Népal'	, 'Nicaragua'	, 'Niger'	, 'Nigeria'	, 'Niue'	, 'Norvège'	, 'Nouvelle-Zélande', 'Oman'	, 'Ouganda'	, 'Ouzbékistan'	, 'Pakistan'	, 'Palaos'	, 'Palestine'	, 'Panama'	, 'Papouasie-Nouvelle-Guinée'	, 'Paraguay'	, 'Pays-Bas'	, 'Pérou'	, 'Philippines'	, 'Pologne'	, 'Portugal'	, 'Qatar'	, 'République centrafricaine', 'République démocratique du Congo'	, 'République Dominicaine'	, 'République du Congo'	, 'République tchèque'	, 'Roumanie'	, 'Royaume-Uni'	, 'Russie'	, 'Rwanda'	, 'Saint-Kitts-et-Nevis'	, 'Saint-Vincent-et-les-Grenadines'	, 'Sainte-Lucie'	, 'Saint-Marin'	, 'Salomon'	, 'Salvador'	, 'Samoa	Apia', 'São Tomé-et-Principe'	, 'Sénégal'	, 'Serbie'	, 'Seychelles'	, 'Sierra Leone'	, 'Singapour'	, 'Slovaquie'	, 'Slovénie'	, 'Somalie'	, 'Soudan'	, 'Soudan du Sud'	, 'Sri Lanka' , 'Suède'	, 'Suisse'	, 'Suriname'	, 'Syrie'	, 'Tadjikistan'	, 'Tanzanie'	, 'Tchad'	, 'Thaïlande'	, 'Timor' , 'Togo'	, 'Tonga'	, 'Trinité-et-Tobago'	, 'Tunisie'	, 'Turkménistan'	, 'Turquie'	, 'Tuvalu'	, 'Ukraine'	, 'Uruguay'	, 'Vanuatu'	, 'Vatican'	, 'Venezuela'	, 'Viêt Nam'	, 'Yémen',
'Zambie', 'Zimbabwe'];
  countrySelect: any = '-1';
  studiesLevelSelect: any = '-1';
  associativeExperienceSelect: any = '-1';
  howKnowUsSelect: any = '-1';
  sexSelect: any = '-1';
  cv: any;
  emailPattern = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  phonePattern = '[0-9]{10}';
  currentYear: number = new Date().getFullYear();
  descTypeBenevole = `Le bénévole joue un rôle essentiel.  En donnant de son temps et de ses compétences, ils participent au bon fonctionnement de l’association.  Il est également sujet à des cotisations exceptionnelles pour soutenir les activités de l’organisation.
    Le bénévole peut devenir un membre actif en montrant son intérêt grâce à son sérieux et son réel engagement. Suite à cela, Il devra de suivre le processus formel d'adhésion.
    NB: Contrairement aux membres actifs, les bénévoles ne sont pas nécessairement engagés dans les décisions ou la gouvernance
    de l'association, bien qu'ils puissent jouer un rôle consultatif dans certains cas.
    `;
  descTypeMA = `Un membre actif s’inscrit officiellement
  en accord avec les statuts et les règlements de l’association.
  Il a des droits et des responsabilités incluant : la participation aux réunions et aux assemblées générales, le droit de vote sur des questions importantes, la possibilité d'occuper des postes au sein du conseil d'administration ou de comités.
  NB: Le membres actif est également tenu de s’acquitter d’une cotisation régulière et mensuelle pour financer les projets de l'association.
  `;
  descTypeMember: string = this.descTypeBenevole;
  benevoleIsChecked = true;
  maIsChecked = false;
  socialNetworkLink: {
    tiktok: string,
    linkedin: string,
    facebook: string,
    instagram: string
  } = environment.socialNetworkLink;
  tiktokIsChecked =  false;
  linkedinIsChecked =   false;
  facebookIsChecked =  false;
  instagramIsChecked =  false;

  constructor(private _fb: FormBuilder, private _membersService: MembersService, private _alertsService: AlertsService) { }

  ngOnInit(): void {

    this.joinUsForm = this._fb.group({
      // descTypeBenevole : this._fb.control(true,Validators.required),
      // descTypeMA : this._fb.control(false,Validators.required),
      email : this._fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      firstname : this._fb.control('', Validators.required),
      lastname : this._fb.control('', Validators.required),
      birthday : this._fb.control('', Validators.required),
      // sex  : this._fb.control('homme'),
      phone : this._fb.control('', Validators.required),
      // country : this._fb.control('',Validators.required),
      city : this._fb.control('', Validators.required),
      // studiesLevel : this._fb.control(''),
      fieldActivity : this._fb.control('', Validators.required),
      // associativeExperience : this._fb.control(''),
      // cv : this._fb.control('',Validators.required),
      qualities : this._fb.control('', Validators.required),
      // howKnowUs : this._fb.control(''),

      tiktok : this._fb.control(''),
      linkedin : this._fb.control(''),
      facebook : this._fb.control(''),
      instagram : this._fb.control(''),
    });

    this.initJs();

    setTimeout(() => {
      $('#country-select').niceSelect('update');
    }, 1000);

  }

  updateDescTypeMember(type: string){
    if (type == 'Bénévole') {
      this.maIsChecked = false;
      this.benevoleIsChecked = true;
      this.descTypeMember = this.descTypeBenevole;
    } else {
      this.maIsChecked = true;
      this.benevoleIsChecked = false;
      this.descTypeMember = this.descTypeMA;
    }
  }

  updateSocialMedia(value: boolean, type: string){
    if (type == 'tiktok') { this.tiktokIsChecked = value; }
    if (type == 'linkedin') { this.linkedinIsChecked = value; }
    if (type == 'facebook') {  this.facebookIsChecked = value; }
    if (type == 'instagram') { this.instagramIsChecked = value;  }
  }

  add(){
    this.submitted = true;
    this.countrySelect = $('#country-select').val();
    this.studiesLevelSelect = $('#studiesLevel-select').val();
    this.associativeExperienceSelect = $('#associativeExperience-select').val();
    this.howKnowUsSelect = $('#howKnowUs-select').val();
    this.sexSelect = $('#sex-select').val();

    if (this.cv != null) {
      if (this.cv.size > 3000000) {
        this._alertsService.error('la taille du fichier doit être inférieure à 3mb',
          {
            autoClose: true,
            keepAfterRouteChange: true,
          });
      }
      if (this.cv.type != 'application/pdf') {
        this._alertsService.error('Le fichier doit être au format pdf.',
          {
            autoClose: true,
            keepAfterRouteChange: true,
          });
      }
    }


    if ((this.joinUsForm.valid && (this.cv == null || ( this.cv.size <= 2000000 && this.cv.type == 'application/pdf'))
      )) {

      const typeMember = this.benevoleIsChecked ? 'Bénévole' : 'Membre Actif';
      const email = this.joinUsForm.get('email')?.value;
      const firstname = this.joinUsForm.get('firstname')?.value;
      const lastname = this.joinUsForm.get('lastname')?.value;
      const birthday = this.joinUsForm.get('birthday')?.value;
      const sex = $('#sex-select').val();
      const phone = this.joinUsForm.get('phone')?.value;
      const country = $('#country-select').val();
      const city = this.joinUsForm.get('city')?.value;
      const studiesLevel =  $('#studiesLevel-select').val();
      const fieldActivity = this.joinUsForm.get('fieldActivity')?.value;
      const associativeExperience =  $('#associativeExperience-select').val();
      const cv = this.cv;
      const qualities = this.joinUsForm.get('qualities')?.value;
      const howKnowUs =  $('#howKnowUs-select').val();
      const tiktok =  this.joinUsForm.get('tiktok')?.value;
      const linkedin =  this.joinUsForm.get('linkedin')?.value;
      const facebook =  this.joinUsForm.get('facebook')?.value;
      const instagram = this.joinUsForm.get('instagram')?.value;

      const member = {
        attributes : {
          typeMember,
          email,
          firstname,
          lastname,
          birthday, // new Date(),//birthday,
          sex,
          phone,
          country,
          city,
          studiesLevel,
          fieldActivity,
          associativeExperience,
          // cv : cv,
          qualities,
          howKnowUs,
          tiktok,
          linkedin,
          facebook,
          instagram
        }
      };



      this._membersService.add(member, this.cv)
      .then((message) => {
        this.submitted = false;
        this.cv = null;
        this.joinUsForm.reset();
        // this.deleteImagePreview();
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
      });

    }
  }



  initJs(){
    // $('select').niceSelect();
    $('#country-select').niceSelect();
    $('#studiesLevel-select').niceSelect(); //
    $('#associativeExperience-select').niceSelect();
    $('#howKnowUs-select').niceSelect();
    $('#sex-select').niceSelect();
  }

  // On file Select
  onChange(event: any) {
    this.cv = event.target.files[0];
  }
}
