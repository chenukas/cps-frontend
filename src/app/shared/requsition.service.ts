import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequisitionsService {
  constructor(private http: HttpClient) {}

  public viewRequisitions() {
    return this.http.get(`${environment.apiHost}/requisitions`);
  }

  public viewRequisitionById(id) {
    return this.http.get(`${environment.apiHost}/requisitions/${id}`);
  }

  public approveRequisitionById(id: string, requisition) {
    return this.http.put(
      `${environment.apiHost}/requisitions/${id}`,
      requisition
    );
  }
}
