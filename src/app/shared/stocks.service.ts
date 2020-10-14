import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(private http: HttpClient) {}

  public addItem(itemName, description, supplier, quantity, unitPrice) {
    return this.http.post(`${environment.apiHost}/items`, {
      itemName,
      description,
      supplier,
      quantity,
      unitPrice,
    });
  }

  public viewItems() {
    return this.http.get(`${environment.apiHost}/items`);
  }

  public viewItemById(id) {
    return this.http.get(`${environment.apiHost}/items/${id}`);
  }

  public updateItemById(id: string, item) {
    return this.http.put(`${environment.apiHost}/items/${id}`, item);
  }

  public deleteItemById(id) {
    return this.http.delete(`${environment.apiHost}/items/${id}`);
  }
}
