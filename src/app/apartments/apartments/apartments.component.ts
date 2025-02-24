import { Component } from '@angular/core';
import { Apartment } from '../../core/models/Apartment.model';
import { CommonService } from '../../core/services/commonService';



@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent {
  listApartments: Apartment[] = [];
  matchingApartmentsCount: number = 0;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.matchingApartmentsCount = this.commonService.getSameValueOf(this.listApartments, 'surface', 80);
  }

}
