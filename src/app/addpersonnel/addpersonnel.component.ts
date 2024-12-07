import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { RegisterDto } from '../../dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpersonnel',
  templateUrl: './addpersonnel.component.html',
  styleUrls: ['./addpersonnel.component.css']
})
export class AddpersonnelComponent {
  personnelForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.personnelForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      Datenaissance: ['', Validators.required],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required, Validators.minLength(6)]],
      poste: ['', [Validators.required, Validators.minLength(2)]],
      dateEmbauche: ['', Validators.required],
      statutFamiliale: ['', Validators.required],
      typeContrat: ['', Validators.required],
      numeroTelephone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      departementId: ['', Validators.required],
      matricule: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.personnelForm.valid) {
      const registerData: RegisterDto = this.personnelForm.value;
      this.apiService.register(registerData).subscribe(
        response => {
          this.snackBar.open('Personnel ajouté avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['snack-bar-success']
          });
          this.router.navigate(['/rh']);
        },
        error => {
          this.snackBar.open('Erreur lors de l\'ajout du personnel', 'Fermer', {
            duration: 3000,
            panelClass: ['snack-bar-error']
          });
        }
      );
    } else {
      this.snackBar.open('Formulaire invalide', 'Fermer', {
        duration: 3000,
        panelClass: ['snack-bar-error']
      });
    }
  }
}
