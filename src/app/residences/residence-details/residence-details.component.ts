import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent {

  numResidence!: number;
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.numResidence = +params.get('id')!;
    });
  }
  nextResidence() {
    this.router.navigate(['/residences', this.numResidence + 1]);
  }
}
