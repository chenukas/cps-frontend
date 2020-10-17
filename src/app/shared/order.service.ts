import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  public viewOrder() {
    return this.http.get(`${environment.apiHost}/orders`);
  }

  public viewOrderById(id) {
    return this.http.get(`${environment.apiHost}/orders/${id}`);
  }
}
