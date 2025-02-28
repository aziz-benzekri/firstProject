import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidencesComponent } from './residences/residences/residence.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResidenceDetailsComponent } from './residences/residence-details/residence-details.component';
import { AddResidenceComponent } from './residences/add-residence/add-residence.component';
import { ApartmentsComponent } from './apartments/apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './apartments/apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './apartments/add-apartment/add-apartment.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'residences/:id/add-apartment', component: AddApartmentComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'residences', component: ResidencesComponent },
  { path: 'residences/add', component: AddResidenceComponent },
  { path: 'residences/:id', component: ResidenceDetailsComponent },
  { path: 'residences/:id/edit', component: AddResidenceComponent },
  { path: 'residences/:id/apartments', component: ApartmentsByResidenceComponent },
  { path: 'apartments', component: ApartmentsComponent },
  { path: 'apartments/add', component: AddApartmentComponent },
  { path: 'apartments/:id', component: AddApartmentComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

