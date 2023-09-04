import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = localStorage.getItem('userToken');
    if (!(token != null || undefined)) {
      this._router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
