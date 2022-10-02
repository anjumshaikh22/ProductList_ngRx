import { state } from '@angular/animations';
import { createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { productState } from '../reducers/product.reducers';

export const productSelector = createSelector(
    (state: productState) => state.products,
    (products: ReadonlyArray<Product>) => products,
    
);

/* export const addProductSelector = createSelector(
    (state: productState) => state.products,
    (state: productState) => state.newProduct,
    (products: ReadonlyArray<Product>, newProduct: Product) => {
      return products.concat(newProduct);
    }
  );

  export const viewProductSelector = createSelector(
    (state: productState) => state.products,
    (products: ReadonlyArray<Product>) => products,
); */