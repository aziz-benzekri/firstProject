import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.residenceForm = this.fb.group({
      id: [''],  // Champ caché
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]], // Validation d'URL
      status: ['Disponible', Validators.required],
      apartments: this.fb.array([])  // FormArray pour gérer les appartements
    });
  }

  ngOnInit(): void { }

  // Accéder à la liste des appartements
  get apartments() {
    return this.residenceForm.get('apartments') as FormArray;
  }

  // Ajouter un appartement au formulaire
  addApartment() {
    const apartmentForm = this.fb.group({
      apartNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      floorNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      surface: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      terrace: [false],
      surfaceterrace: [{ value: '', disabled: true }, [Validators.pattern('^[0-9]*$')]],
      category: ['s+1', Validators.required],
      ResidenceId: ['', Validators.required] // Assigner l'ID de la résidence
    });

    // Activer/désactiver le champ surfaceterrace en fonction de la valeur de terrace
    apartmentForm.get('terrace')?.valueChanges.subscribe(value => {
      const surfaceTerraceControl = apartmentForm.get('surfaceterrace');
      if (value) {
        surfaceTerraceControl?.enable();
      } else {
        surfaceTerraceControl?.disable();
      }
    });

    this.apartments.push(apartmentForm);
  }

  // Supprimer un appartement de la liste
  removeApartment(index: number) {
    this.apartments.removeAt(index);
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.residenceForm.valid) {
      console.log('Résidence:', this.residenceForm.value);
    }
  }
}
