import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
const routes: Routes = [

  { path: 'personnel', component: PersonnelComponent  },
      { path: 'rh', component:  RhComponent },
      { path: 'departement', component:  DepartementComponent },
      { path: 'comptabilite', component:  ComptabiliteComponent },
      { path: 'adddepartement', component:AdddepartementComponent },
      { path: 'calculpaye', component:CalculpayeComponent },
      { path: 'comptaddassuid', component:ComptaddassuidComponent },
      { path: 'assuiditecompt', component:AssuiditecomptComponent },
      { path: 'lisperdep', component: LisperdepComponent },
      { path: 'assiduite', component: AssiduiteComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'addpersonnel', component:AddpersonnelComponent },
      { path: 'updpersonnel', component:UpdpersonnelComponent },
      { path: 'listepersonnel', component:ListepersonnelComponent },
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
