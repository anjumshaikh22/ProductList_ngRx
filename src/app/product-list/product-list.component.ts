import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product/product.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getProducts } from '../store/actions/product.action';
import { productState } from '../store/reducers/product.reducers';
import { productSelector } from '../store/selector/product.selector';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  busyMessage = 'Loading...';
  busy: Subscription | undefined;
  pageSubscription: Subscription| undefined;
  filter = new FormControl('');
  pageSizeOptions: any = [10, 50];
  defaultPageSize = 10;
  totalCount = '50';
  columns: any[] = [  {
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
    private store: Store<productState>) { 
  
  }
  

  ngOnInit(): void {
    this.resetDataSource();
    this.changeDisplayColumn();
  }

  ngAfterViewInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.store.dispatch(getProducts(this.totalCount));
    this.store.select(productSelector).subscribe((arr) => {
      console.log("fromStore.getAllEmp: " + arr);
      this.productList = arr.concat();
      console.log("dataSource: " + this.productList.length);
      this.resetDataSource();
    }); 
    
   /* this.productList = [
      {
       id : 7416, 
       uid: "51f7aa23-fb27-4a07-8ceb-52eef6f6292f",
       blend_name: "Melty Enlightenment",
       origin: "Kigeyo Washing Station, Rwanda",
       variety: "Pacas",
       notes: "juicy, coating, banana, raspberry, potato defect!",
       intensifier: "faint"
    },
    {
       id: 4380,
       uid: "3eae3950-bd7e-4029-a42d-3dce2c4b7419",
       blend_name: "Goodbye Cowboy",
      origin: "Boquete, Panama",
      variety: "Dilla",
      notes: "pointed, slick, marshmallow, rubber, hay",
      intensifier: "delicate"
    },
    {
      id: 3404,
      uid: "bfb8e7a7-dda3-48d1-91cf-b2d4285780c0",
      blend_name: "Goodbye Coffee",
      origin: "Santander, Colombia",
      variety: "S.4",
      notes: "rounded, silky, fresh wood, walnut, plum",
      intensifier: "unbalanced"
    },
    {
      id: 5360,
      uid: "7eca9d3f-a8b2-4d66-a678-47d67d98b035",
      blend_name: "Wake-up Volcano",
      origin: "San Luis Potosi, Mexico",
      variety:  "Villalobos",
      notes: "vibrant, syrupy, papaya, lemongrass, molasses",
      intensifier: "soft"
    }];*/
  }

  resetDataSource() {
    this.dataSource = new MatTableDataSource (this.productList);
    this.dataSource.paginator = this.paginator;
  }

  changeDisplayColumn() {
    this.displayedColumns = _.map(_.filter(this.columns, 'show'), 'column');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

