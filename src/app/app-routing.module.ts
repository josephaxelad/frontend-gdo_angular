import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ActionsComponent } from './components/actions/actions.component';
import { CdoComponent } from './components/actions/cdo/cdo.component';
import { SaComponent } from './components/actions/sa/sa.component';
import { ActiviesComponent } from './components/activies/activies.component';
import { ActivitiesAllComponent } from './components/activies/activities-all/activities-all.component';
import { ActivitySingleComponent } from './components/activies/activity-single/activity-single.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { GalleriesComponent } from './components/galleries/galleries.component';
import { HomeComponent } from './components/home/home.component';
import { JoinUsComponent } from './components/join-us/join-us.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'a-propos-de-nous', component: AboutComponent},
  {path: 'actions', component: ActionsComponent,
  children : [
    {path: 'coeur-d-or', component: CdoComponent},
    {path: 'shine-academy', component: SaComponent},
    {path: '', pathMatch : 'full' , redirectTo: ''},
  ]
  },
  {path: 'activites', component: ActiviesComponent,
    children : [
      {path: 'activites/activite/:id', component: ActivitySingleComponent},
      {path: '', component: ActivitiesAllComponent},
      {path: '', pathMatch : 'full' , redirectTo: ''},
    ]
  },
  {path: 'galerie', component: GalleriesComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '404', component: NotFoundPageComponent},
  // {path: 'partenaires', component: },
  {path: 'nous-rejoindre', component: JoinUsComponent},
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: '**', pathMatch: 'full', redirectTo: '404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration : 'enabled', anchorScrolling : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
