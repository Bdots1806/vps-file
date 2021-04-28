import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {ApplicationService} from './e-appication.service';

@Component({
  selector: 'app-form-application',
  templateUrl: './e-application.component.html',
  styleUrls: ['../style.css']
})
// tslint:disable-next-line:class-name
export class ApplicationComponent{

  private mode = 'create';
  private PVId: string;
  form: FormGroup;
  imagePreview: string;
  isLoading = false;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public PVService: ApplicationService,
    public route: ActivatedRoute
  ) { }



  ngOnInit(){
    this.form = new FormGroup({
      fname: new FormControl(null, {
        validators: [Validators.required]
      }),
      mname: new FormControl(null, { validators: [Validators.required] }),
      surname: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      pincode: new FormControl(null, { validators: [Validators.required] }),
      mobile: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      state: new FormControl(null, { validators: [Validators.required] }),
      hnumber: new FormControl(null, { validators: [Validators.required] }),
      soc: new FormControl(null, { validators: [Validators.required] }),
      street: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      area: new FormControl(null, { validators: [Validators.required] }),
      apincode: new FormControl(null, { validators: [Validators.required] }),
      type: new FormControl(null, { validators: [Validators.required] }),
      district: new FormControl(null, { validators: [Validators.required] }),
      pstation: new FormControl(null, { validators: [Validators.required] }),
      dfrom: new FormControl(null, { validators: [Validators.required] }),
      tfrom: new FormControl(null, { validators: [Validators.required] }),
      dto: new FormControl(null, { validators: [Validators.required] }),
      tto: new FormControl(null, { validators: [Validators.required] }),
      bdes: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      })
    });
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveForm() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.PVService.addapp(
        this.form.value.fname,
        this.form.value.mname,
        this.form.value.surname,
        this.form.value.address,
        this.form.value.pincode,
        this.form.value.mobile,
        this.form.value.email,
        this.form.value.country,
        this.form.value.state,
        this.form.value.hnumber,
        this.form.value.soc,
        this.form.value.street,
        this.form.value.city,
        this.form.value.area,
        this.form.value.apincode,
        this.form.value.type,
        this.form.value.district,
        this.form.value.pstation,
        this.form.value.dfrom,
        this.form.value.tfrom,
        this.form.value.dto,
        this.form.value.tto,
        this.form.value.bdes,
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
