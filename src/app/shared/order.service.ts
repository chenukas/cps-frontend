import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public viewOrder() {
    return this.http.get(`${environment.apiHost}/orders`);
  }

  public viewOrderById(id) {
    return this.http.get(`${environment.apiHost}/orders/${id}`);
  }

  public changeOrderState(id: string) {
    return this.http.put(`${environment.apiHost}/orders/${id}/status`, {});
  }

  public viewDeliveredOrders() {
    return this.http.get(`${environment.apiHost}/orders/status/Delivered`);
  }
}
