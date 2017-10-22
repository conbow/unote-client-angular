import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { Account } from '../models';

@Injectable()
export class AccountService {
  private currentAccountSubject = new BehaviorSubject<Account>(new Account());
  public currentAccount = this.currentAccountSubject
    .asObservable()
    .distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private sessionService: SessionService
  ) {}

  // Verify JWT in localstorage with server & load account's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store account's info
    if (this.sessionService.getToken() && this.sessionService.getAccountId()) {
      this.apiService
        .get('/accounts/' + this.sessionService.getAccountId())
        .subscribe(data => this.setAuth(data), err => this.purgeAuth());
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(account: Account) {
    // Save account id in localstorage
    if (account.id) {
      this.sessionService.saveAccountId(account.id);
    }
    // Save session token in localstorage
    if (account.sessionToken) {
      this.sessionService.saveToken(account.sessionToken);
    }
    // Set current account data into observable
    this.currentAccountSubject.next(account);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.sessionService.destroySession();
    // Set current account to an empty object
    this.currentAccountSubject.next(new Account());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<Account> {
    const route = type === 'login' ? '/sessions' : '/accounts';
    return this.apiService.post(route, credentials).map(data => {
      this.setAuth(data);
      return data;
    });
  }

  getCurrentAccount(): Account {
    return this.currentAccountSubject.value;
  }

  // Update the account on the server (email, password, etc)
  update(account): Observable<Account> {
    return this.apiService
      .put('/accounts/' + account.id, { account })
      .map(data => {
        // Update the currentAccount observable
        this.currentAccountSubject.next(data.account);
        return data.account;
      });
  }

  delete(id) {
    return this.apiService.delete('/accounts/' + id);
  }
}
