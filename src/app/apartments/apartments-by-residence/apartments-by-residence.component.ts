import { Component, OnInit } from '@angular/core';
import { ResidenceService } from '../../core/services/ResidenceService';

@Component({
  selector: 'app-apartments-by-residence',
  templateUrl: './apartments-by-residence.component.html',
  styleUrls: ['./apartments-by-residence.component.css']
})
export class ApartmentsByResidenceComponent implements OnInit {

  residences: any[] = [];
  selectedResidence: any = null;
  apartments: any[] = [];

  constructor(private residenceService: ResidenceService) { }

  ngOnInit(): void {
    this.fetchResidences();
  }

  fetchResidences(): void {
    this.residenceService.getResidences().subscribe(
      (data) => {
        this.residences = data;  // Mettre à jour la liste des résidences
      },
      (error) => {
        console.error('Erreur lors de la récupération des résidences', error);
      }
    );
  }

  onResidenceSelect(event: any): void {
    const index = event.target.value;  // Assurez-vous de récupérer l'index du select
    this.selectedResidence = this.residences[index];
    this.apartments = this.selectedResidence?.apartments || [];  // Lier les appartements directement à la résidence
  }
}
