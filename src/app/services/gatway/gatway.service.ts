import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GatwayService {

  constructor(private http: HttpClient) { }

  makeRequest(method: any, url: any , parameters: {}, headers?: any, responseType?: any) {
    let headerParams: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'APP-TYPE': 'WEB',
    }

    const httpHeaders = new HttpHeaders(_.merge(headerParams, headers));
    const body = method.toLowerCase() === 'post' || method.toLowerCase() === 'put' ?
      parameters : [];
    const params = method.toLowerCase() === 'get' || method.toLowerCase() === 'delete' ?
      parameters : [];
    const options = {
      body,
      headers: httpHeaders,
      params,
      responseType
    };

    if (!method || !url) {
      const err = new Error('method and url must be defined');
      return err;
    }
    

    return this.http.request(method, url, options);
  }

  

}
