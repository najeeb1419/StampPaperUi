import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from wherever you store it (e.g., localStorage)
    const token = localStorage.getItem('userToken');
    // Clone the request and add the Bearer token to the headers
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }



  

}
