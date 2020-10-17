import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getRequisitionsByStatus() {
    return this.http.get(`${environment.apiHost}/statistics/reqbystatus`);
  }
}
