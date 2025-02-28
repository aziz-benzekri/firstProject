import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResidenceService } from 'src/app/core/services/ResidenceService';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm: FormGroup;

  constructor(private fb: FormBuilder, private residenceService: ResidenceService) {
    this.residenceForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]],
      status: ['Disponible', Validators.required],
      apartments: this.fb.array([])
    });
  }

  ngOnInit(): void { }

  get apartments() {
    return this.residenceForm.get('apartments') as FormArray;
  }

  addApartment() {
    const apartmentForm = this.fb.group({
      apartNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      floorNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      surface: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      terrace: [false],
      surfaceterrace: [{ value: '', disabled: true }, [Validators.pattern('^[0-9]*$')]],
      category: ['s+1', Validators.required],
      ResidenceId: ['', Validators.required]
    });

    apartmentForm.get('terrace')?.valueChanges.subscribe(value => {
      const surfaceTerraceControl = apartmentForm.get('surfaceterrace');
      value ? surfaceTerraceControl?.enable() : surfaceTerraceControl?.disable();
    });

    this.apartments.push(apartmentForm);
  }

  removeApartment(index: number) {
    this.apartments.removeAt(index);
  }

  onSubmit() {
    if (this.residenceForm.valid) {
      this.residenceService.addResidence(this.residenceForm.value).subscribe(
        response => {
          console.log('Résidence ajoutée avec succès', response);
          alert('Résidence ajoutée !');
          this.residenceForm.reset();  // Réinitialiser le formulaire après l'ajout
        },
        error => {
          console.error('Erreur lors de l’ajout de la résidence', error);
          alert('Échec de l’ajout de la résidence');
        }
      );
    }
  }
}
