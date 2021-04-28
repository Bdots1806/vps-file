import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EA } from './e-application.module';
import { title } from 'process';

@Injectable({ providedIn: 'root' })
export class ApplicationService {

  private apps: EA[] = [];
  private appsUpdated = new Subject<EA[]>();

  constructor(private http: HttpClient, private router: Router) { }
  addapp(fname: string,
         mname: string,
         surname: string,
         address: string,
         pincode: string,
         mobile: string,
         email: string,
         country: string,
         state: string,
         hnumber: string,
         soc: string,
         street: string,
         city: string,
         area: string,
         apincode: string,
         type: string,
         district: string,
         pstation: string,
         dfrom: string,
         tfrom: string,
         dto: string,
         tto: string,
         bdes: string,
         image: File): any {
    const appData = new FormData();
    appData.append('fname', fname);
    appData.append('mname', mname);
    appData.append('surname', surname);
    appData.append('address', address);
    appData.append('pincode', pincode);
    appData.append('mobile', mobile);
    appData.append('email', email);
    appData.append('country', country);
    appData.append('state', state);
    appData.append('hnumber', hnumber);
    appData.append('soc', soc);
    appData.append('street', street);
    appData.append('city', city);
    appData.append('area', area);
    appData.append('apincode', apincode);
    appData.append('type', type);
    appData.append('district', district);
    appData.append('pstation', pstation);
    appData.append('dfrom', dfrom);
    appData.append('tfrom', tfrom);
    appData.append('dto', dto);
    appData.append('tto', tto);
    appData.append('bdes', bdes);
    appData.append('image', image, title);
    this.http.post<{ message: string; app: EA }>(
      'http://localhost:3000/api/eapp/',
      appData)
      .subscribe(responseData => {
        this.router.navigate(['/applist']);
      });
  }

  getapps() {
    // const queryParams = '?pagesize=${postsPerPage}&page=${currentPage}';
    this.http.get<{ message: string; apps: any }>(
      'http://localhost:3000/api/eapp'
    ).pipe(
      map(appData => {
        return appData.apps.map(app => {
          return {
            id: app._id,
            fname: app.fname,
            mname: app.mname,
            surname: app.surname,
            address: app.address,
            pincode: app.pincode,
            mobile: app.mobile,
            email: app.email,
            country: app.country,
            state: app.state,
            hnumber: app.hnumber,
            soc: app.soc,
            street: app.street,
            city: app.city,
            area: app.area,
            apincode: app.apincode,
            type: app.type,
            district: app.district,
            pstation: app.pstation,
            dfrom: app.dfrom,
            tfrom: app.tfrom,
            dto: app.dto,
            tto: app.tto,
            bdes: app.bdes,
            imagePath: app.imagePath
          };
        });
        // maxApps: appData.maxApps
      })
    )
      .subscribe(transformedApps => {
        this.apps = transformedApps;
        this.appsUpdated.next([...this.apps]);
      });
  }

  getAppUpdateListener() {
    return this.appsUpdated.asObservable();
  }

  // getappo(id: string) {
  //   return this.http.get<{
  //     _id: string,
  //     fname: string,
  //     mname: string,
  //     surname: string,
  //     mobile: string,
  //     anumber: string,
  //     email: string,
  //     country: string,
  //     state: string,
  //     district: string,
  //     pstation: string,
  //     address: string,
  //     occupation: string,
  //     city: string,
  //     pincode: string,
  //     pnumber: string,
  //     pidate: string,
  //     pedate: string,
  //     adprof: string,
  //     pov: string,
  //     imagePath: string}>('http://localhost:3000/api/policever/' + id);
  // }

  deleteapp(appID: string) {
    this.http.delete('http://localhost:3000/api/challan/' + appID)
      .subscribe(() => {
        const updatedApps = this.apps.filter(app => app.id !== appID);
        this.apps = updatedApps;
        this.appsUpdated.next([...this.apps]);
      });
  }
}


