import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { PayeDto } from '../../dto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-calculpaye',
  templateUrl: './calculpaye.component.html',
  styleUrls: ['./calculpaye.component.css']
})
export class CalculpayeComponent implements OnInit {
  payes: PayeDto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPayes();
  }

  loadPayes(): void {
    this.apiService.getAllPaye().subscribe(
      (data: PayeDto[]) => {
        this.payes = data.map(paye => ({
          ...paye,
          datepaiement: new Date(paye.datepaiement),
          periode: new Date(paye.periode)
        }));
        console.log(this.payes); // Log to verify data
      },
      error => {
        console.error('Erreur lors de la récupération des paies', error);
      }
    );
  }

  calculateSalaries(): void {
    const calculateObservables = this.payes.map(paye =>
      this.apiService.calculatePaye(
        paye.matricule,
        paye.periode.toISOString().substring(0, 10),
        paye.salairebrut,
        0, 0, 0
      )
    );
  
    forkJoin(calculateObservables).subscribe(
      (calculatedPayes: PayeDto[]) => {
        this.payes = this.payes.map((paye, index) => ({
          ...paye,
          calculatedSalary: calculatedPayes[index].salairenet, // Ajout de la propriété calculatedSalary
          datepaiement: new Date(calculatedPayes[index].datepaiement),
          periode: new Date(calculatedPayes[index].periode)
        }));
        console.log(this.payes); // Log to verify data
      },
      error => {
        console.error('Erreur lors du calcul des paies', error);
      }
    );
  }
}  