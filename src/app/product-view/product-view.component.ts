// Bonus Point 3: This component is used  to display "View-Product" in dialog box.

import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validation } from '../../app/validation/validation';
import { select, Store } from '@ngrx/store';
import { productState } from '../store/reducers/product.reducers';
import * as _ from 'lodash';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent implements OnInit {
  productDetails = _.cloneDeep(this.data.productDetails);
  constructor(
    public dialogRef: MatDialogRef<ProductViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<productState>,
    private cdRef: ChangeDetectorRef) { 
    }

  ngOnInit(): void {
    // Bonus Point 2: Following markForCheck function used to inform mark this as change
    this.cdRef.markForCheck();
  }

  cancel() {
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
