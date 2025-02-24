import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Apartment } from '../../core/models/Apartment.model';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  apartForm: FormGroup;
  newApart!: Apartment;

  constructor(private fb: FormBuilder) {
    this.apartForm = this.fb.group({
      apartmentNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      floorNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      residence: ['', Validators.required],
      terrace: ['false', Validators.required],  // Initialisé à "false" par défaut
      surfaceTerrace: [{ value: '', disabled: true }],
      category: new FormControl('s+1', Validators.required)
    });
  }

  ngOnInit(): void {

    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value === 'true') {
        this.apartForm.get('surfaceTerrace')?.enable();
      } else {
        this.apartForm.get('surfaceTerrace')?.disable();
        this.apartForm.get('surfaceTerrace')?.setValue('');
      }
    });
  }

  onSubmit() {
    if (this.apartForm.valid) {
      this.newApart = this.apartForm.value;
      console.log('Nouvel appartement:', this.newApart);
    }
  }
}
