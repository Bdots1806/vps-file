import { Component, OnInit } from '@angular/core';
import { PV } from './policever.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PVService } from './policever.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-form-police',
  templateUrl: './policever.component.html',
  styleUrls: ['../style.css']
})
// tslint:disable-next-line:class-name
export class PoliceVerificationComponent implements OnInit{
  app: PV;
  private mode = 'create';
  private PVId: string;
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public PVService: PVService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.form = new FormGroup({
      fname: new FormControl(null, {
        validators: [Validators.required]
      }),
      surname: new FormControl(null, { validators: [Validators.required] }),
      mobile: new FormControl(null, { validators: [Validators.required] }),
      anumber: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      state: new FormControl(null, { validators: [Validators.required] }),
      district: new FormControl(null, { validators: [Validators.required] }),
      pstation: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      occupation: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      pincode: new FormControl(null, { validators: [Validators.required] }),
      pnumber: new FormControl(null, { validators: [Validators.required] }),
      pidate: new FormControl(null, { validators: [Validators.required] }),
      pedate: new FormControl(null, { validators: [Validators.required] }),
      adprof: new FormControl(null, { validators: [Validators.required] }),
      pov: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('PVId')) {
        this.mode = 'edit';
        this.PVId = paramMap.get('PVId');
        this.isLoading = true;
        this.PVService.getapp(this.PVId).subscribe(appData => {
          this.isLoading = false;
          this.app = {
            id: appData._id,
            fname: appData.fname,
            mname: appData.mname,
            surname: appData.surname,
            mobile: appData.mobile,
            anumber: appData.anumber,
            email: appData.email,
            country: appData.country,
            state: appData.state,
            district: appData.district,
            pstation: appData.pstation,
            address: appData.address,
            occupation: appData.occupation,
            city: appData.city,
            pincode: appData.pincode,
            pnumber: appData.pnumber,
            pidate: appData.pidate,
            pedate: appData.pedate,
            adprof: appData.adprof,
            pov: appData.pov,
            imagePath: appData.imagePath
          };
          this.form.setValue({
            fname: this.app.fname,
            mname: this.app.mname,
            surname: this.app.surname,
            mobile: this.app.mobile,
            anumber: this.app.anumber,
            email: this.app.email,
            country: this.app.country,
            state: this.app.state,
            district: this.app.district,
            pstation: this.app.pstation,
            address: this.app.address,
            occupation: this.app.occupation,
            city: this.app.city,
            pincode: this.app.pincode,
            pnumber: this.app.pnumber,
            pidate: this.app.pidate,
            pedate: this.app.pedate,
            adprof: this.app.adprof,
            pov: this.app.pov,
            image: this.app.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.PVId = null;
      }
    });
  }

  onImagePicked(event: Event) {
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
      this.PVService.addapp(this.form.value.fname,
        this.form.value.mname,
        this.form.value.surname,
        this.form.value.mobile,
        this.form.value.anumber,
        this.form.value.email,
        this.form.value.country,
        this.form.value.state,
        this.form.value.district,
        this.form.value.pstation,
        this.form.value.address,
        this.form.value.occupation,
        this.form.value.city,
        this.form.value.pincode,
        this.form.value.pnumber,
        this.form.value.pidate,
        this.form.value.pedate,
        this.form.value.adprof,
        this.form.value.pov
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


