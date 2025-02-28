import { Component } from '@angular/core';
import { Residence } from '../../core/models/residence.model';
import { CommonService } from '../../core/services/commonService';
import { ResidenceService } from '../../core/services/ResidenceService';
import { Apartment } from '../../core/models/Apartment.model';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})
export class ResidencesComponent {

  matchingResidencesCount: number = 0;


  listResidences: Residence[] = [
    { id: 5, name: 'El Fel', address: 'Borj Cedria', image: '../../assets/images/R1.jpeg', status: 'Disponible' },
    { id: 6, name: 'El Yasmine', address: 'Ezzahra', image: '../../assets/images/R2.jpg', status: 'Disponible' },
    { id: 7, name: 'El Arij', address: 'Rades', image: '../../assets/images/R3.jpg', status: 'Vendu' },
    { id: 8, name: 'El Anber', address: 'inconnu', image: '../../assets/images/R4.jpg', status: 'En Construction' }
  ];
  /**
   * 
   * 
   */
  constructor(private residenceService: ResidenceService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.matchingResidencesCount = this.commonService.getSameValueOf(this.listResidences, 'address', 'Borj Cedria');

    this.residenceService.getResidences().subscribe(data => {
      this.listResidences = data;
    });
  }

  // bech tfaskh res
  deleteResidence(id: number): void {
    this.residenceService.deleteResidence(id).subscribe(() => {
      this.listResidences = this.listResidences.filter(residence => residence.id !== id);
    });
  }




  favoriteResidences: Residence[] = [];
  address: string = '';

  showLocation(address: string): void {
    if (address === 'inconnu') {
      alert('L\'adresse de cette résidence est inconnue.');
    } else {
      alert('L\'adresse de cette résidence est : ' + address);
    }
  }

  addToFavorites(residence: Residence): void {
    if (!this.favoriteResidences.includes(residence)) {
      this.favoriteResidences.push(residence);
    }
  }
  getFilteredResidences(): Residence[] {
    if (!this.address.trim()) {
      return this.listResidences; // Retourne toute la liste si rien n'est recherché
    }
    return this.listResidences.filter(residence =>
      residence.address.toLowerCase().includes(this.address.toLowerCase())
    );
  }

  addApartmentToResidence(residenceId: string, apartment: Apartment): void {
    const residence = this.listResidences.find(r => r.id === parseInt(residenceId, 10));
    if (residence) {
      if (!residence.apartments) {
        residence.apartments = [];  // Initialiser si undefined
      }
      residence.apartments.push(apartment);  // Ajouter l'appartement
      console.log(`Appartement ajouté à la résidence ${residence.name}`);
    } else {
      console.error("Résidence non trouvée !");
    }
  }
  onDeleteResidence(id: number) {
    this.residenceService.deleteResidence(id).subscribe({
      next: () => {
        console.log(`Résidence ${id} supprimée avec succès.`);
        this.residenceService.getResidences().subscribe(data => {
          this.listResidences = data;
        });
        // Recharge la liste après suppression
      },
      error: (err) => console.error('Erreur lors de la suppression:', err)
    });
  }

}




