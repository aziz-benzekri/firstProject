import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from '../../core/models/Apartment.model';
import { ResidenceService } from '../../core/services/ResidenceService';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  apartForm: FormGroup;
  residenceId?: number;
  residences: any[] = []; // Liste des résidences

  constructor(
    private fb: FormBuilder,
    private residenceService: ResidenceService // Service pour gérer les résidences
    , private route: ActivatedRoute
  ) {
    this.apartForm = this.fb.group({
      apartNum: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      floorNum: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      surface: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      terrace: [false, Validators.required],
      surfaceterrace: [{ value: '', disabled: true }],
      category: ['s+1', Validators.required],
      ResidenceId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.apartForm.patchValue({ ResidenceId: this.residenceId });
    }, 0);




    this.residenceId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Résidence ID récupéré:", this.residenceId);

    // Récupérer les résidences au démarrage
    this.residenceService.getResidences().subscribe((data) => {
      this.residences = data;
    });

    // Activer/désactiver le champ surfaceTerrace en fonction de la terrasse
    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value) {
        this.apartForm.get('surfaceterrace')?.enable();
        this.apartForm.get('surfaceterrace')?.setValidators([Validators.required, Validators.pattern("^[0-9]*$")]);
      } else {
        this.apartForm.get('surfaceterrace')?.disable();
        this.apartForm.get('surfaceterrace')?.setValue('');
        this.apartForm.get('surfaceterrace')?.clearValidators();
      }
      this.apartForm.get('surfaceterrace')?.updateValueAndValidity(); // Recalculer la validité du champ
    });
  }


  onSubmit(): void {
    if (this.apartForm.valid) {
      const residenceId = this.apartForm.get('ResidenceId')?.value;  // Récupérer l'ID de la résidence sélectionnée
      console.log('ID de la résidence:', residenceId);

      // Trouver la résidence correspondante avec l'ID
      const selectedResidence = this.residences.find(residence => residence.id === residenceId);

      if (selectedResidence) {
        const newApartment: Apartment = {
          ...this.apartForm.value,
          ResidenceId: selectedResidence.id  // Associer l'ID de la résidence trouvée
        };

        // Vérifier si 'apartments' est bien un tableau, sinon initialiser un tableau vide
        if (!Array.isArray(selectedResidence.apartments)) {
          selectedResidence.apartments = [];
        }

        // Ajouter l'appartement à la résidence sans l'imbriquer
        selectedResidence.apartments.push(newApartment); // Ajouter le nouvel appartement au tableau des appartements
        console.log('Appartement ajouté avec succès !', newApartment);

        // Envoyer la requête pour mettre à jour la résidence avec le tableau des appartements mis à jour
        this.residenceService.updateResidenceWithApartment(residenceId, selectedResidence).subscribe(
          response => {
            console.log('Réponse du serveur:', response);
          },
          error => console.error("Erreur lors de l'ajout de l'appartement:", error)
        );
      } else {
        console.error('Résidence non trouvée avec cet ID:', residenceId);
      }
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }







}
