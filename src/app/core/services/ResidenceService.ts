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
}
