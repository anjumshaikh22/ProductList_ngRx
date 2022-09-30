import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EmptyError } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product/product.service';
import { getProducts, getProductListSuccess } from '../actions/product.action';

@Injectable()
export class ProductEffect {

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
    ofType(getProducts),
    exhaustMap((action) => this.productService.getProductList(action.size).pipe(
      map((products) => getProductListSuccess(products)),
    ))
    )
  );

  constructor(
    private action$: Actions,
    private productService: ProductService
  ) { };

}