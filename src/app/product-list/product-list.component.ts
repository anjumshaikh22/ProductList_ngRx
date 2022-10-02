import {
   Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef, 
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product/product.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getProducts, addProduct } from '../store/actions/product.action';
import { productState } from '../store/reducers/product.reducers';
import { productSelector } from '../store/selector/product.selector';
import { Product } from '../models/product.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductViewComponent } from '../product-view/product-view.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  busyMessage = 'Loading...';
  busy: Subscription | undefined;
  pageSubscription: Subscription | undefined;
  filter = new FormControl('');
  pageSizeOptions: any = [10, 50];
  defaultPageSize = 10;
  totalCount = '50';
  columns: any[] = [{
    column: 'id', show: true, default: true,
    displayName: 'Id'
  },
  {
    column: 'blend_name', show: true, default: true,
    displayName: 'Blend Named'
  },
  {
    column: 'origin', show: true, default: true,
    displayName: 'Origin'
  },
  {
    column: 'variety', show: true, default: true,
    displayName: 'Variety'
  },
  {
    column: 'notes', show: true, default: true,
    displayName: 'Notes'
  },
  {
    column: 'intensifier', show: true, default: true,
    displayName: 'Intensifier'
  }];

  product$ = this.store.pipe(select(productSelector));

  productList: Product[] = [];
  displayedColumns: string[] = ['id', 'blend_name', 'origin', 'variety', 'notes', 'intensifier'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private store: Store<productState>,
    private matDialog: MatDialog,
    private cdRef: ChangeDetectorRef) {
     
      // Bonus Point 2: Used to avoid change detection in Initial stage
      this.cdRef.detach();
  }


  ngOnInit(): void {
    this.resetDataSource();
    this.changeDisplayColumn();
   
  }

  ngAfterViewInit(): void {
    this.getProductList();
  }

  getProductList() {
    // This dispatch() method of store is used to invoke getProducts() of Action by passing totalCount as parameter
    this.store.dispatch(getProducts(this.totalCount));

     // Bonus Point 1: Here Used select() method of store to used selector to fetch data from store and display on DOM
    this.store.select(productSelector).subscribe((productListArray) => {
      console.log("fromStore.getAllEmp: " + productListArray);
      
      // Here we don't have an API to add product so I referred concat method to add immutable array just for change detect in productList
      this.productList = productListArray.concat();
      this.resetDataSource();

      // Bonus Point 2: Used change detection method markForCheck() to notify angular to mark change
      this.cdRef.markForCheck();
    });
  }

  resetDataSource() {
    this.dataSource = new MatTableDataSource(this.productList);
    this.dataSource.paginator = this.paginator;
  }

  // Method to add array columns to mat-table.
  changeDisplayColumn() {
    this.displayedColumns = _.map(_.filter(this.columns, 'show'), 'column');
  }

  // Method to filter the Mat-table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Method to open 'Create-Product' dialog box, set cofiguration.
  openCreateProductDialog() {
    let config = new MatDialogConfig();
    config = {
      width: '100vw',
      panelClass: 'full-screen-modal',
      disableClose: true
    };
    const emailDialogRef = this.matDialog.open(ProductCreateComponent, config);

    emailDialogRef.afterClosed().subscribe((productFormOBJ) => {
     // this.store.dispatch(addProduct(productFormOBJ));
     this.productList = this.productList.concat(productFormOBJ);
     this.resetDataSource()

    });
  }

// Bonus Point 3: Method to display 'View-Product' dialog box, set cofiguration.
  viewProduct(productDetail: Product) {
    let config = new MatDialogConfig();
    config = {
      data: {
        productDetails: productDetail
      },
      width: '100vw',
      panelClass: 'full-screen-modal',
      disableClose: true
    };
    const emailDialogRef = this.matDialog.open(ProductViewComponent, config);

    emailDialogRef.afterClosed().subscribe((productDetail) => {
    });
  }
 
  // Bonus Point 2: Detect Changes whenever this method after view check
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}

