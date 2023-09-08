

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './environments/environment';

const _API_BASE_URL_ = environment.baseUrl;
const toastDuration = 3000;
const toastPosition = 'bottom-right';

@Injectable({
  providedIn: 'root'
})
export class ApiProxyService {

   boundary = 'boundary-' + Date.now();

  constructor(private http: HttpClient) { }

  private async getAuthToken(): Promise<string> {
    let token = '';
    try {
      token = localStorage.getItem("userToken") || '';
    } catch { }
    return token;
  }

  private async handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  private async addAuthorizationHeader(headers: { [key: string]: string }) {
    const token = await this.getAuthToken();
    if (token) {
      return {
        ...headers,
        Authorization: `Bearer ${token}`
      };
    }
    return headers;
  }

  private async handleResponse(response: any) {
    if (response?.data?.success) {
      // toast.success(response?.data?.message, {
      //   position: toastPosition,
      //   duration: toastDuration
      // });
      return response.data.result;
    } else {
      const errorMsg = response?.data?.message || 'Something went wrong...';
      // toast.error(errorMsg, {
      //   position: toastPosition,
      //   duration: toastDuration
      // });
      throw errorMsg;
    }
  }

  private async handleErrorResponse(error: any) {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error, e.g., logout logic
      window.location.assign('/logout');
    }
    return this.handleError(error.message || error.response?.data || error.response || error);
  }

  async getRequest(url: string, headers: { [key: string]: string } = {}): Promise<Observable<any>> {
    return this.http
      .get(`${_API_BASE_URL_}${url}`, { headers: await this.addAuthorizationHeader(headers) })
      .pipe(catchError(this.handleError));
  }


  async getRequestByMultipleParams(url: string, requestParameters: any, headers: { [key: string]: string } = {}): Promise<Observable<any>> {
    const params = new HttpParams({ fromObject: requestParameters });

    return this.http
      .get(`${_API_BASE_URL_}${url}`, { headers: await this.addAuthorizationHeader(headers), params })
      .pipe(catchError(this.handleError));
  }

  async getRequestById(url: string, id: any): Promise<Observable<any>> {
    return this.http
      .get(`${_API_BASE_URL_}${url}?id=${id}`, { headers: await this.addAuthorizationHeader({}) })
      .pipe(catchError(this.handleError));
  }

  async getRequestQry(url: string, stringQuery: string): Promise<Observable<any>> {
    return this.http
      .get(`${_API_BASE_URL_}${url}${stringQuery}`, { headers: await this.addAuthorizationHeader({}) })
      .pipe(catchError(this.handleError));
  }

  async postRequest(url: string, requestParameters: any, headers: { [key: string]: string } = {}): Promise<Observable<any>> {
    return this.http
      .post(`${_API_BASE_URL_}${url}`, requestParameters, { headers: await this.addAuthorizationHeader(headers) })
      .pipe(catchError(this.handleError));
  }

  async patchRequest(url: string, requestParameters: any, headers: { [key: string]: string } = {}): Promise<Observable<any>> {
    return this.http
      .patch(`${_API_BASE_URL_}${url}`, requestParameters, { headers: await this.addAuthorizationHeader(headers) })
      .pipe(catchError(this.handleError));
  }

  async postWithFilesRequest(url: string, requestParameters: any): Promise<Observable<any>> {
    const headers = await  this.addAuthorizationHeader({ });
    return this.http
      .post(`${_API_BASE_URL_}${url}`, requestParameters, { headers })
      .pipe(catchError(this.handleError));
  }



  async putWithFilesRequest(url: string, requestParameters: any): Promise<Observable<any>> {
    const headers = await  this.addAuthorizationHeader({});
    return this.http
      .put(`${_API_BASE_URL_}${url}`, requestParameters, { headers })
      .pipe(catchError(this.handleError));
  }



  async deleteRequest(url: string, id: any): Promise<Observable<any>> {
    return this.http
      .delete(`${_API_BASE_URL_}${url}?id=${id}`, { headers: await  this.addAuthorizationHeader({})
})
      .pipe(catchError(this.handleError));
  }

  async deleteRequestOnlyUrl(url: string): Promise<Observable<any>> {
    return this.http
      .delete(`${_API_BASE_URL_}${url}`, { headers: await this.addAuthorizationHeader({}) })
      .pipe(catchError(this.handleError));
  }

  async postDeleteRequest(url: string, id: any): Promise<Observable<any>> {
    return this.http
      .post(`${_API_BASE_URL_}${url}/${id}`, {}, { headers: await this.addAuthorizationHeader({}) })
      .pipe(catchError(this.handleError));
  }

  async putRequest(url: string, requestParameters?: any): Promise<Observable<any>> {
    const headers = await this.addAuthorizationHeader({});
    if (requestParameters) {
      return this.http
        .put(`${_API_BASE_URL_}${url}`, requestParameters, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .put(`${_API_BASE_URL_}${url}`, {}, { headers })
        .pipe(catchError(this.handleError));
    }
  }

}

