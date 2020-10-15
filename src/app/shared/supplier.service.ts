import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  public getNextSupNo() {
    return this.http.get(`${environment.apiHost}/getSupNumber`);
  }

  public addSupplier(supId, supName, supLocation, supEmail, supTel) {
    return this.http.post(`${environment.apiHost}/suppliers`, {
      supId,
      supName,
      supLocation,
      supEmail,
      supTel,
    });
  }

  public viewSuppliers() {
    return this.http.get(`${environment.apiHost}/suppliers`);
  }

  public viewSupplierById(id) {
    return this.http.get(`${environment.apiHost}/suppliers/${id}`);
  }

  public updateSupplierDetails(id: string, supplier) {
    return this.http.put(`${environment.apiHost}/suppliers/${id}`, supplier);
  }

  public deleteSupplierById(id) {
    return this.http.delete(`${environment.apiHost}/suppliers/${id}`);
  }
}
