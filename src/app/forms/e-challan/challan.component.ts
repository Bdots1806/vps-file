import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChallanService } from './challan.service';
@Component({
  selector: 'app-form-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css']
})
// tslint:disable-next-line:class-name
export class ChallanComponent{

  private mode = 'create';
  private PVId: string;
  form: FormGroup;
  imagePreview: string;
  isLoading = false;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public PVService: ChallanService,
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
      vnumber: new FormControl(null, { validators: [Validators.required] }),
      cdate: new FormControl(null, { validators: [Validators.required] }),
      cdes: new FormControl(null, { validators: [Validators.required] }),
      amount: new FormControl(null, { validators: [Validators.required] }),
      district: new FormControl(null, { validators: [Validators.required] }),
      pstation: new FormControl(null, { validators: [Validators.required] }),
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
        this.form.value.vnumber,
        this.form.value.cdate,
        this.form.value.cdes,
        this.form.value.amount,
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
