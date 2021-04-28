import { Component, OnInit } from '@angular/core';
import { NOC } from './noc.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NOCService } from './noc.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-form-noc',
  templateUrl: './noc.component.html',
  styleUrls: ['../style.css']
})
// tslint:disable-next-line:class-name
export class NOCComponent implements OnInit{
  app: NOC;
  private mode = 'create';
  private PVId: string;
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public NOCService: NOCService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.form = new FormGroup({
      fname: new FormControl(null, { validators: [Validators.required] }),
      mname: new FormControl(null, { validators: [Validators.required] }),
      surname: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      pincode: new FormControl(null, { validators: [Validators.required] }),
      mobile: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      nadate: new FormControl(null, { validators: [Validators.required] }),
      ponoc: new FormControl(null, { validators: [Validators.required] }),
      nocf: new FormControl(null, { validators: [Validators.required] }),
      district: new FormControl(null, { validators: [Validators.required] }),
      pstation: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      })
    });
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (paramMap.has('PVId')) {
  //       this.mode = 'edit';
  //       this.PVId = paramMap.get('PVId');
  //       this.isLoading = true;
  //       this.PVService.getappo(this.PVId).subscribe(appData => {
  //         this.isLoading = false;
  //         this.app = {
  //           id: appData._id,
  //           fname: appData.fname,
  //           mname: appData.mname,
  //           surname: appData.surname,
  //           mobile: appData.mobile,
  //           anumber: appData.anumber,
  //           email: appData.email,
  //           country: appData.country,
  //           state: appData.state,
  //           district: appData.district,
  //           pstation: appData.pstation,
  //           address: appData.address,
  //           occupation: appData.occupation,
  //           city: appData.city,
  //           pincode: appData.pincode,
  //           pnumber: appData.pnumber,
  //           pidate: appData.pidate,
  //           pedate: appData.pedate,
  //           adprof: appData.adprof,
  //           pov: appData.pov,
  //           imagePath: appData.imagePath
  //         };
  //         this.form.setValue({
  //           fname: this.app.fname,
  //           mname: this.app.mname,
  //           surname: this.app.surname,
  //           mobile: this.app.mobile,
  //           anumber: this.app.anumber,
  //           email: this.app.email,
  //           country: this.app.country,
  //           state: this.app.state,
  //           district: this.app.district,
  //           pstation: this.app.pstation,
  //           address: this.app.address,
  //           occupation: this.app.occupation,
  //           city: this.app.city,
  //           pincode: this.app.pincode,
  //           pnumber: this.app.pnumber,
  //           pidate: this.app.pidate,
  //           pedate: this.app.pedate,
  //           adprof: this.app.adprof,
  //           pov: this.app.pov,
  //           image: this.app.imagePath
  //         });
  //       });
  //     } else {
  //       this.mode = 'create';
  //       this.PVId = null;
  //     }
  //   });
  }

    onImagePicked(event: Event): any {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // tslint:disable-next-line:typedef
    onSaveForm() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.NOCService.addapp(this.form.value.fname,
        this.form.value.mname,
        this.form.value.surname,
        this.form.value.address,
        this.form.value.pincode,
        this.form.value.mobile,
        this.form.value.email,
        this.form.value.nadate,
        this.form.value.ponoc,
        this.form.value.nocf,
        this.form.value.district,
        this.form.value.pstation,
        this.form.value.image
      );
      // } else {
      //   this.postsService.updatePost(
      //     this.postId,
      //     form.value.title,
      //     form.value.content
      //   );
      // }
      this.form.reset();
    }
  }
}
