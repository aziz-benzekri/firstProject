// src/app/core/services/residence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/Apartment.model';
@Injectable({
    providedIn: 'root'
})
export class ResidenceService {
    private residenceUrl = 'http://localhost:3000/residences';

    constructor(private http: HttpClient) { }

    getResidences(): Observable<any> {
        return this.http.get(this.residenceUrl);
    }

    deleteResidence(id: number): Observable<any> {
        return this.http.delete(`${this.residenceUrl}/${id}`);
    }

    addResidence(residence: any): Observable<any> {
        return this.http.post(this.residenceUrl, residence);
    }

    getResidenceById(id: number): Observable<any> {
        return this.http.get(`${this.residenceUrl}/${id}`);
    }

    updateResidence(id: number, residence: any): Observable<any> {
        return this.http.put(`${this.residenceUrl}/${id}`, residence);
    }
    addApartmentToResidence(residenceId: number, apartment: Apartment): Observable<any> {
        return this.http.post<any>(`${this.residenceUrl}/${residenceId}/apartments`, apartment);
    }
    updateResidenceWithApartment(residenceId: number, updatedResidence: any) {
        return this.http.patch(`http://localhost:3000/residences/${residenceId}`, {
            apartments: updatedResidence.apartments  // Mettre à jour le tableau des appartements directement
        });
    }











}
