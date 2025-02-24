import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ResidenceService } from '../../core/services/ResidenceService';


@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent {

  numResidence!: number;

  // ekhr tp
  id!: number;
  residence: any = {};
  residenceForm: any;
  // --------


  constructor(private route: ActivatedRoute, private router: Router, private residenceService: ResidenceService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.numResidence = +params.get('id')!;
    });

    // *****
    this.id = this.route.snapshot.params['id'];
    this.residenceService.getResidenceById(this.id).subscribe(data => {
      this.residence = data;
      this.residenceForm.patchValue(this.residence);
    });
  }
  nextResidence() {
    this.router.navigate(['/residences', this.numResidence + 1]);
  }


  // *****
  updateResidence(): void {
    this.residenceService.updateResidence(this.id, this.residence).subscribe(() => {
    });
  }






}
