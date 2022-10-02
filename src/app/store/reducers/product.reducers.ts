import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { getProductListSuccess, addProduct } from '../actions/product.action';

export interface productState {
    product: readonly Product[];
    products: ReadonlyArray<Product>;
    // newProduct: Readonly<Product>;
    // productDetail: Readonly<Product>;
}

const initialState: ReadonlyArray<Product> = [];
const addedProductState: Product = {
    id: 2312312,
    uid: '',
    blend_name: '',
    origin: '',
    variety: '',
    notes: '',
    intensifier: ''
};

export const productReducer = createReducer(
    initialState,
    on(getProductListSuccess, (state, { products }) => [...products]),
  );

/* export const addProductReducer = createReducer(
    addedProductState,
    on(addProduct, (state, { newProduct }) => newProduct)
);
    
export const productDetailReducer = createReducer(
    addedProductState,
    on(getProductDetails, (state, { productDetail }) => productDetail)
); */

