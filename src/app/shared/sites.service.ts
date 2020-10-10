import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Site } from './sites.model';

@Injectable({
    providedIn: 'root'
})

export class SitesService {

    constructor(
        private http: HttpClient
    ) { }

    public addSite(siteNo, siteName, address, city, phoneNo){
        return this.http.post(`${environment.apiHost}/sites`, {siteNo, siteName, address, city, phoneNo});
    }

    public viewSites(){
        return this.http.get(`${environment.apiHost}/sites`);
    }

    public viewSiteById(id){
        return this.http.get(`${environment.apiHost}/sites/${id}`);
    }

    public updateSiteDetails(id : string, site){
        return this.http.put(`${environment.apiHost}/sites/${id}`, site);
    }

    public deleteSiteById(id){
        return this.http.delete(`${environment.apiHost}/sites/${id}`);
    }
}