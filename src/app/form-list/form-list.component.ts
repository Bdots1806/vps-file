import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PV } from '../forms/Police Verification/policever.module';
import { PVService } from '../forms/Police Verification/policever.service';

@Component({
  selector: 'app-from-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})

export class FormlistComponent implements OnInit, OnDestroy {
  apps: PV[] = [];
  // totalApps = 0;
  // appsPerPage = 5;
  // currentPage = 1;
  // pageSizeOptions = [1, 2, 5, 10];
  private appsSub: Subscription;

  constructor(
    public pvService: PVService
  ){}

  ngOnInit(){
    this.pvService.getapps();
    this.appsSub = this.pvService.getAppUpdateListener().subscribe((apps: PV[]) => {
      // this.totalApps = appData.appCount;
      this.apps = apps;
    });
  }

  onDelete(appID: string){
    this.pvService.deleteapp(appID);
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


