import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AccountService } from '../shared';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private router: Router, private accountService: AccountService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountService.isAuthenticated.take(1);
  }
}
