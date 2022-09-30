import { state } from '@angular/animations';
import { createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { productState } from '../reducers/product.reducers';

export const productSelector = createSelector(
    (state: productState) => state.products,
    (products: ReadonlyArray<Product>) => products
)