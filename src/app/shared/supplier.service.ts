import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  //http requests
  //get request to get next supplier id
  public getNextSupNo() {
    return this.http.get(`${environment.apiHost}/getSupNumber`);
  }

  //post request add new supplier
  public addSupplier(supId, supName, supLocation, supEmail, supTel) {
    return this.http.post(`${environment.apiHost}/suppliers`, {
      supId,
      supName,
      supLocation,
      supEmail,
      supTel,
    });
  }

  //get request to get all supplier details
  public viewSuppliers() {
    return this.http.get(`${environment.apiHost}/suppliers`);
  }

  //get request to get supplier detail by Id
  public viewSupplierById(id) {
    return this.http.get(`${environment.apiHost}/suppliers/${id}`);
  }

  //put request to update supplier details
  public updateSupplierDetails(id: string, supplier) {
    return this.http.put(`${environment.apiHost}/suppliers/${id}`, supplier);
  }

  //delete request to remove supplier from the system
  public deleteSupplierById(id) {
    return this.http.delete(`${environment.apiHost}/suppliers/${id}`);
  }
}
