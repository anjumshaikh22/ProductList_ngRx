import { createAction, props } from "@ngrx/store"
import { Product } from "src/app/models/product.model";

export const getProducts = createAction('[Product] Get Product', 
(size: string) => ({size}));

export const getProductListSuccess =  createAction('[Product] Get Product List Success',
 (products: ReadonlyArray<Product>) => ({products})
);

export const addProduct = createAction('[Product] Add new Product',
(newProduct: Product) => ({newProduct}));

/* export const addProductSuccess = createAction('[Product] Add Product Success',
(newProduct: Product) => ({newProduct}));

export const getProductDetails = createAction('[Product] View Product Detail',
(productDetail: Product) => ({productDetail})); */