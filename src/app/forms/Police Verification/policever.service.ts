import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PV } from './policever.module';
import { title } from 'process';

@Injectable({ providedIn: 'root' })
export class PVService {

  private apps: PV[] = [];
  private appsUpdated = new Subject<{ apps: PV[]; appCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }
  addapp(fname: string,
         mname: string,
         surname: string,
         mobile: string,
         anumber: string,
         email: string,
         country: string,
         state: string,
         district: string,
         pstation: string,
         address: string,
         occupation: string,
         city: string,
         pincode: string,
         pnumber: string,
         pidate: string,
         pedate: string,
         adprof: string,
         pov: string,
         image: File): any {
    const appData = new FormData();
    appData.append('fname', fname);
    appData.append('mname', mname);
    appData.append('surname', surname);
    appData.append('mobile', mobile);
    appData.append('anumber', anumber);
    appData.append('email', email);
    appData.append('country', country);
    appData.append('state', state);
    appData.append('district', district);
    appData.append('pstation', pstation);
    appData.append('address', address);
    appData.append('occupation', occupation);
    appData.append('city', city);
    appData.append('pincode', pincode);
    appData.append('pnumber', pnumber);
    appData.append('pidate', pidate);
    appData.append('pedate', pedate);
    appData.append('adprof', adprof);
    appData.append('pov', pov);
    appData.append('image', image, title);
    this.http.post<{ message: string; apps: PV }>(
      'http://localhost:3000/api/policever/',
      appData)
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  getapp(appsperpage: number, currentPage: number): any{
    const queryParams = '?pagesize=${postsPerPage}&page=${currentPage}';
    this.http.get<{ message: string; apps: any; maxApps: number}>(
      'http://localhost:3000/api/policever/' + queryParams
    ).pipe(
      map(appData => {
        return{
          apps: appData.apps.map(app => {
            return {
              id: app._id,
              fname: app.fname,
         mname: app.mname,
         surname: app.surname,
         mobile: app.mobile,
         anumber: app.anumber,
         email: app.email,
         country: app.country,
         state: app.sttate,
         district: app.district,
         pstation: app.pstation,
         address: app.address,
         occupation: app.occupation,
         city: app.city,
         pincode: app.pincode,
         pnumber: app.pnumber,
         pidate: app.pidate,
         pedate: app.pedate,
         adprof: app.adprof,
         pov: app.pov,
         imagePath: app.imagePath
            };
          }),
          maxApps: appData.maxApps
        };
      })
    )
    .subscribe(transformedAppData => {
      this.apps = transformedAppData.apps;
      this.appsUpdated.next({
        apps: [...this.apps],
        appCount: transformedAppData.maxApps
      });
    });
  }

  getAppUpdateListener(){
    return this.appsUpdated.asObservable();
  }

  getappo(id: string) {
    return this.http.get<{
      _id: string,
      fname: string,
      mname: string,
      surname: string,
      mobile: string,
      anumber: string,
      email: string,
      country: string,
      state: string,
      district: string,
      pstation: string,
      address: string,
      occupation: string,
      city: string,
      pincode: string,
      pnumber: string,
      pidate: string,
      pedate: string,
      adprof: string,
      pov: string,
      imagePath: string}>('http://localhost:3000/api/policever/' + id);
  }
}
