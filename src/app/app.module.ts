import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importer MatSnackBarModule
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AssiduiteComponent } from './assiduite/assiduite.component';
import { ProfilComponent } from './profil/profil.component';
import { CongeComponent } from './conge/conge.component';
import { PermissionComponent } from './permission/permission.component';
import { PayeComponent } from './paye/paye.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { RhComponent } from './rh/rh.component';
import { ValidationcongeComponent } from './validationconge/validationconge.component';
import { ValidationpermissionComponent } from './validationpermission/validationpermission.component';
import { AddpersonnelComponent } from './addpersonnel/addpersonnel.component';
import { ListepersonnelComponent } from './listepersonnel/listepersonnel.component';
import { UpdpersonnelComponent } from './updpersonnel/updpersonnel.component';
import { DepartementComponent } from './departement/departement.component';
import { AdddepartementComponent } from './adddepartement/adddepartement.component';
import { LisperdepComponent } from './lisperdep/lisperdep.component';
import { ListassiduiteComponent } from './listassiduite/listassiduite.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { CalculpayeComponent } from './calculpaye/calculpaye.component';
import { AssuiditecomptComponent } from './assuiditecompt/assuiditecompt.component';
import { ComptaddassuidComponent } from './comptaddassuid/comptaddassuid.component';
import { ValidpayeComponent } from './validpaye/validpaye.component';
import { ApiService } from './api.service';
import { AuthInterceptor } from '../auth.interceptor';

const routes: Routes = [
  { path: 'personnel', component: PersonnelComponent },
  { path: 'rh', component: RhComponent },
  { path: 'departement', component: DepartementComponent },
  { path: 'comptabilite', component: ComptabiliteComponent },
  { path: 'adddepartement', component: AdddepartementComponent },
  { path: 'calculpaye', component: CalculpayeComponent },
  { path: 'comptaddassuid', component: ComptaddassuidComponent },
  { path: 'assuiditecompt', component: AssuiditecomptComponent },
  { path: 'lisperdep', component: LisperdepComponent },
  { path: 'assiduite', component: AssiduiteComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'addpersonnel', component: AddpersonnelComponent },
  { path: 'updpersonnel', component: UpdpersonnelComponent },
  { path: 'listepersonnel', component: ListepersonnelComponent },
  { path: 'listassiduite', component: ListassiduiteComponent },
  { path: 'conge', component: CongeComponent },
  { path: 'validationconge', component: ValidationcongeComponent },
  { path: 'validationpermission', component: ValidationpermissionComponent },
  { path: 'permission', component: PermissionComponent },
  { path: 'paye', component: PayeComponent },
  { path: 'validpaye', component: ValidpayeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
];

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    allowedDomains: ['localhost:5053'],
    disallowedRoutes: ['localhost:5053/api/auth/login', 'localhost:5053/api/auth/register']
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AssiduiteComponent,
    ProfilComponent,
    CongeComponent,
    PermissionComponent,
    PayeComponent,
    PersonnelComponent,
    RhComponent,
    ValidationcongeComponent,
    ValidationpermissionComponent,
    AddpersonnelComponent,
    ListepersonnelComponent,
    UpdpersonnelComponent,
    DepartementComponent,
    AdddepartementComponent,
    LisperdepComponent,
    ListassiduiteComponent,
    ComptabiliteComponent,
    CalculpayeComponent,
    AssuiditecomptComponent,
    ComptaddassuidComponent,
    ValidpayeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSnackBarModule, // Importer MatSnackBarModule
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    })
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
