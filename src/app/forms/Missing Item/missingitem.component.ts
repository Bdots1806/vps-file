import { Component } from '@angular/core';
// import { MissingItemService } from './missingitem.service';
declare const myFunction: any;
declare const myFunction1: any;
@Component({
  selector: 'app-form-item',
  templateUrl: './missingitem.component.html',
  styleUrls: ['../style.css']
})
// tslint:disable-next-line:class-name
export class MissingItemComponent{
    // tslint:disable-next-line:typedef
    Vehicle(){
      myFunction();
    }
    // tslint:disable-next-line:typedef
    Other(){
      myFunction1();
    }

}
