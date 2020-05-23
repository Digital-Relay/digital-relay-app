import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectLoginStatus} from '../store';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginStatus: Observable<boolean>;

  constructor(private store: Store<DigitalRelayState>, private router: Router) {
    this.loginStatus = store.select(selectLoginStatus);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginStatus.pipe(
      switchMap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['login']);
        }
        return this.loginStatus;
      })
    );
  }

}
