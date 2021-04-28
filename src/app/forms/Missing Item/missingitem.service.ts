import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MSI } from './missingitem.module';
import { title } from 'process';

@Injectable({ providedIn: 'root' })
export class MissingItemService {
  private apps: MSI[] = [];
  private appsUpdated = new Subject<MSI[]>();

  constructor(private http: HttpClient, private router: Router) { }
  addapp(fname: string,
         mname: string,
         surname: string,
         address: string,
         pincode: string,
         mobile: string,
         email: string,
         nadate: string,
         ponoc: string,
         nocf: string,
         district: string,
         pstation: string,
         image: File): any {
    const appData = new FormData();
    appData.append('fname', fname);
    appData.append('mname', mname);
    appData.append('surname', surname);
    appData.append('address', address);
    appData.append('pincode', pincode);
    appData.append('mobile', mobile);
    appData.append('email', email);
    appData.append('nadate', nadate);
    appData.append('ponoc', ponoc);
    appData.append('nocf', nocf);
    appData.append('district', district);
    appData.append('pstation', pstation);
    appData.append('image', image, title);
    this.http.post<{ message: string; app: MSI }>(
      'http://localhost:3000/api/noc/',
      appData)
      .subscribe(responseData => {
        this.router.navigate(['/applist']);
      });
  }

  getapps() {
    // const queryParams = '?pagesize=${postsPerPage}&page=${currentPage}';
    this.http.get<{ message: string; apps: any }>(
      'http://localhost:3000/api/noc'
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
            nadate: app.nadate,
            ponoc: app.ponoc,
            nocf: app.nocf,
            district: app.district,
            pstation: app.pstation,
            imagePath: app.imagePath,
            creator: app.creator
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

  deleteapp(appID: string){
    this.http.delete('http://localhost:3000/api/noc/' + appID)
    .subscribe(() => {
      const updatedApps = this.apps.filter(app => app.id !== appID);
      this.apps = updatedApps;
      this.appsUpdated.next([...this.apps]);
    });
  }

}
