import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { PV } from '../forms/Police Verification/policever.module';
import { PVService } from '../forms/Police Verification/policever.service';
import { Challan } from '../forms/e-challan/challan.module';
import { ChallanService } from '../forms/e-challan/challan.service';
import { NOC } from '../forms/NOC/noc.module';
import { NOCService } from '../forms/NOC/noc.service';
import { EA } from '../forms/e-application/e-application.module';
import { ApplicationService } from '../forms/e-application/e-appication.service';

@Component({
  selector: 'app-from-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})

export class FormlistComponent implements OnInit, OnDestroy {
  apps: PV[] = [];
  challans: Challan[] = [];
  nocs: NOC[] = [];
  eapps: EA[] = [];
  // totalApps = 0;
  // appsPerPage = 5;
  // currentPage = 1;
  // pageSizeOptions = [1, 2, 5, 10];
  private appsSub: Subscription;

  constructor(
    public pvService: PVService,
    public challanService: ChallanService,
    public nocService: NOCService,
    public applicationService: ApplicationService
  ){}

  ngOnInit(){
    this.pvService.getapps();
    this.appsSub = this.pvService.getAppUpdateListener().subscribe((apps: PV[]) => {
      // this.totalApps = appData.appCount;
      this.apps = apps;
    });
    this.challanService.getapps();
    this.appsSub = this.challanService.getAppUpdateListener().subscribe((apps: Challan[]) => {
      // this.totalApps = appData.appCount;
      this.challans = apps;
    });
    this.nocService.getapps();
    this.appsSub = this.nocService.getAppUpdateListener().subscribe((apps: NOC[]) => {
      // this.totalApps = appData.appCount;
      this.nocs = apps;
    });
    this.applicationService.getapps();
    this.appsSub = this.applicationService.getAppUpdateListener().subscribe((apps: EA[]) => {
      // this.totalApps = appData.appCount;
      this.eapps = apps;
    });
  }

  onDelete(appID: string){
    this.pvService.deleteapp(appID);
  }
  onDeleteC(appID: string){
    this.challanService.deleteapp(appID);
  }
  onDeleteN(appID: string){
    this.nocService.deleteapp(appID);
  }
  onDeleteE(appID: string){
    this.applicationService.deleteapp(appID);
  }

  // onChangedPage(pageData: PageEvent) {
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.appsPerPage = pageData.pageSize;
  //   this.PVService.getapps(this.appsPerPage, this.currentPage);
  // }

  ngOnDestroy(){
    this.appsSub.unsubscribe();
  }
}


