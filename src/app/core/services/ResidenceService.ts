// src/app/core/services/residence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResidenceService {
    private residenceUrl = 'http://localhost:3000/residences';

    constructor(private http: HttpClient) { }

    // Méthode pour obtenir la liste des résidences
    getResidences(): Observable<any> {
        return this.http.get(this.residenceUrl);
    }

    // Méthode pour supprimer une résidence
    deleteResidence(id: number): Observable<any> {
        return this.http.delete(`${this.residenceUrl}/${id}`);
    }

    // Méthode pour ajouter une nouvelle résidence
    addResidence(residence: any): Observable<any> {
        return this.http.post(this.residenceUrl, residence);
    }

    // Méthode pour obtenir une résidence par ID
    getResidenceById(id: number): Observable<any> {
        return this.http.get(`${this.residenceUrl}/${id}`);
    }

    // Méthode pour mettre à jour une résidence
    updateResidence(id: number, residence: any): Observable<any> {
        return this.http.put(`${this.residenceUrl}/${id}`, residence);
    }
}
