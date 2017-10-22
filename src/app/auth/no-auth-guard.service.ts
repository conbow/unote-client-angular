import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AccountService } from '../shared';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountService.isAuthenticated.take(1).map(bool => !bool);
  }
}
