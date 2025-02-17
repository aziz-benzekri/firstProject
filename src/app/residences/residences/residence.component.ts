import { Component } from '@angular/core';
import { Residence } from '../../core/models/residence.model';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})
export class ResidencesComponent {
  listResidences: Residence[] = [
    { id: 1, name: 'El Fel', address: 'Borj Cedria', image: '../../assets/images/R1.jpeg', status: 'Disponible' },
    { id: 2, name: 'El Yasmine', address: 'Ezzahra', image: '../../assets/images/R2.jpg', status: 'Disponible' },
    { id: 3, name: 'El Arij', address: 'Rades', image: '../../assets/images/R3.jpg', status: 'Vendu' },
    { id: 4, name: 'El Anber', address: 'inconnu', image: '../../assets/images/R4.jpg', status: 'En Construction' }
  ];

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
}
