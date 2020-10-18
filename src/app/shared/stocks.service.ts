import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(private http: HttpClient) {}

  //http requests
  //post request to add new item to the system
  public addItem(itemName, description, supplier, quantity, unitPrice) {
    return this.http.post(`${environment.apiHost}/items`, {
      itemName,
      description,
      supplier,
      quantity,
      unitPrice,
    });
  }

  //get request to view all items
  public viewItems() {
    return this.http.get(`${environment.apiHost}/items`);
  }

  //get request to view an item by Id
  public viewItemById(id) {
    return this.http.get(`${environment.apiHost}/items/${id}`);
  }

  //put request to update item details
  public updateItemById(id: string, item) {
    return this.http.put(`${environment.apiHost}/items/${id}`, item);
  }

  //delete request to remove item from the syetem
  public deleteItemById(id) {
    return this.http.delete(`${environment.apiHost}/items/${id}`);
  }
}
