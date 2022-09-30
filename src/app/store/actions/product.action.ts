import { createAction, props } from "@ngrx/store"
import { Product } from "src/app/models/product.model";

export const getProducts = createAction('[Product] Get Product', 
(size: string) => ({size}));

export const getProductListSuccess =  createAction('[Product] Get Product List Success',
 (products: ReadonlyArray<Product>) => ({products})
/* props<{products: ReadonlyArray<Product>}>()*/
);