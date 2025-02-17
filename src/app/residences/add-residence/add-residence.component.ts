import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent {

  residenceForm!: FormGroup;


  residenceId: number | null = null;


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.residenceId = id ? +id : null;
    });
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.residenceForm = this.fb.group({
      id: [Math.random().toString(36).substr(2, 9)], // ID généré aléatoirement
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/)]],
      status: ['Disponible'],
      apartments: this.fb.array([])
    });
  }

  get apartments() {
    return this.residenceForm.get('apartments') as FormArray;
  }



  addApartment() {
    this.apartments.push(this.fb.group({
      apartmentNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      floorNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      terrace: [false],
      surfaceTerrace: [{ value: '', disabled: true }]
    }));
  }

  removeApartment(index: number) {
    this.apartments.removeAt(index);
  }

  onSubmit() {
    if (this.residenceForm.valid) {
      console.log('Nouvelle résidence:', this.residenceForm.value);
    }
  }
}
