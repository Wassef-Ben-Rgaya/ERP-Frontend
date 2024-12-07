import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { PersonnelDto } from '../../dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listepersonnel',
  templateUrl: './listepersonnel.component.html',
  styleUrls: ['./listepersonnel.component.css']
})
export class ListepersonnelComponent implements OnInit {
  personnelList: PersonnelDto[] = [];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPersonnel();
  }

  loadPersonnel(): void {
    this.apiService.getPersonnelList().subscribe(
      (data: PersonnelDto[]) => {
        this.personnelList = data;
      },
      error => {
        this.snackBar.open('Erreur lors de la récupération des employés', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-error']
        });
      }
    );
  }

  confirmDelete(matricule: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      this.deleteEmployee(matricule); 
    }
  }

  deleteEmployee(matricule: number): void {
    this.apiService.deletePersonnel(matricule).subscribe(
      response => {
        this.snackBar.open('Employé supprimé avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-success']
        });
        this.loadPersonnel(); // Recharger la liste après suppression
      },
      error => {
        this.snackBar.open('Erreur lors de la suppression de l\'employé', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-error']
        });
      }
    );
  }
}
