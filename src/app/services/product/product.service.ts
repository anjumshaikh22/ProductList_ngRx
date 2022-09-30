import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GatwayService } from '../gatway/gatway.service';
import { Observable }  from 'rxjs';
import { AnyFn } from '@ngrx/store/src/selector';
import { map, catchError } from 'rxjs/operators';

export interface Product {
  id: number;
  uid: string;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private gatewayService: GatwayService) { }
  
  getProductList(size: string): Observable<Array<Product>> {{
    const url = "https://random-data-api.com/api/coffee/random_coffee"

    let params = new HttpParams();
    params = params.append('size', size);
    const headers = {
      contentType: 'application/json' as const,
      accept: 'application/json' as const

    }
    const options = {
      headers: headers,
      observe: 'response' as const,
      responseType: 'json' as const,
      params: params
    };
  
    return this.http.get(url, options)
    .pipe(
      map((data: any) => {
        return data.body;
      })
    );
   }
}
}