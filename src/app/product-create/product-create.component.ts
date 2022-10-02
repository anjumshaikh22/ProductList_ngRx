import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Validation } from '../../app/validation/validation';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent implements OnInit {
  productForm: any;

  constructor(
    public dialogRef: MatDialogRef<ProductCreateComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.productForm = this.formBuilder.group({
      id: '',
      uid: [null, [Validators.required, Validation.nameValidator]],
      blend_name: [null, [Validators.required, Validation.nameValidator]],
      origin: [null, [Validators.required]],
      variety: [null, [Validators.required]],
      notes: null,
      intensifier: [null, [Validators.required]], 
    });
  }

  cancel() {
    this.closeDialog();
  }

  save() {
    if (this.productForm.valid) {
      
    // Bonus Point 2: Following markForCheck function used to inform mark this as change
      this.cdRef.markForCheck();
      this.dialogRef.close(this.productForm.getRawValue());

    } else {
      Validation.validateAllFormFields(this.productForm);
      alert("Please fill mandatory");
     console.log("Error while saving....")
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
