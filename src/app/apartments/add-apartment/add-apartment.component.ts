import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Apartment } from '../../core/models/Apartment.model';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  apartForm: FormGroup;
  newApart!: Apartment;

  constructor(private fb: FormBuilder) {
    this.apartForm = this.fb.group({
      apartmentNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      floorNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      residence: ['', Validators.required],
      terrace: [false],
      surfaceTerrace: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value) {
        this.apartForm.get('surfaceTerrace')?.enable();
      } else {
        this.apartForm.get('surfaceTerrace')?.disable();
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
