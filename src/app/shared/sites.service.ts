import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  constructor(private http: HttpClient) {}

  public getNextSiteNo() {
    return this.http.get(`${environment.apiHost}/getSiteNumber`);
  }

  public addSite(siteNo, siteName, siteManagerName, location, budget) {
    return this.http.post(`${environment.apiHost}/sites`, {
      siteNo,
      siteName,
      siteManagerName,
      location,
      budget,
    });
  }

  public viewSites() {
    return this.http.get(`${environment.apiHost}/sites`);
  }

  public viewSiteById(id) {
    return this.http.get(`${environment.apiHost}/sites/${id}`);
  }

  public updateSiteDetails(id: string, site) {
    return this.http.put(`${environment.apiHost}/sites/${id}`, site);
  }

  public deleteSiteById(id) {
    return this.http.delete(`${environment.apiHost}/sites/${id}`);
  }
}
