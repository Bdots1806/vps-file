import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PV } from './policever.module';

@Injectable({ providedIn: 'root' })
export class PVService {

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
         pov: string): any {
    const app: PV = { id: null, fname,
      mname,
      surname,
      mobile,
      anumber,
      email,
      country,
      state,
      district,
      pstation,
      address,
      occupation,
      city,
      pincode,
      pnumber,
      pidate,
      pedate,
      adprof,
      pov,
    imagePath};
    this.http
      .post<{ message: string; appId: string }>(
        'http://localhost:3000/api/policever',
        app
      )
      .subscribe(responseData => {
        const id = responseData.PVId;
        app.id = id;
        this.apps.push(app);
        this.appsUpdated.next([...this.apps]);
      });
  }
}
