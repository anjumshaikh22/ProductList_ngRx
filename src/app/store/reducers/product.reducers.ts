import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { getProductListSuccess } from '../actions/product.action';

export interface productState {
    products: ReadonlyArray<Product>;
}

const initialState: ReadonlyArray<Product> = [];

export const productReducer = createReducer(
initialState,
on(getProductListSuccess, (state, {products})=>
[...products])
);