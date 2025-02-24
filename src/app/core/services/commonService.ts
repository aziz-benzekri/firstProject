// src/app/core/services/common.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    getSameValueOf(list: any[], critiria: string, value: any): number {
        return list.filter(item => item[critiria] === value).length;
    }
}
