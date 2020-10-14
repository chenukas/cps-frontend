import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class RequisitionsService {

    constructor(
        private http: HttpClient
    ) { }

    public viewRequisition(){
        this.http.get(`${environment.apiHost}/Requisitions`);
    }

    public viewRequisitionById(id){
        this.http.get(`${environment.apiHost}/Requisitions/${id}`);
    }

    public updateRequisitionById(id: string, requisition) {
        this.http.put(`${environment.apiHost}/Requisitions/${id}`, requisition);
    }

    public updateStatusById(id: string, requisition) {
        this.http.put(`${environment.apiHost}/Requisitions/${id}`, requisition);
    }
}