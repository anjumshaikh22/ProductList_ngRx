import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Validation } from '../../app/validation/validation';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: any;

  constructor(
    public dialogRef: MatDialogRef<ProductCreateComponent>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.productForm = this.formBuilder.group({
      id: '',
      uid: null,
      blend_name: [null, [Validators.required, Validation.nameValidator]],
      origin: null,
      variety: null,
      notes: null,
      intensifier: null 
    });
  }

  cancel() {
    this.closeDialog();
  }

  save() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.getRawValue());
    } else {
      Validation.validateAllFormFields(this.productForm);
     console.log("Error while saving....")
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
  


}
