import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  getAccountId(): String {
    return window.localStorage['accountId'];
  }

  saveAccountId(accountId: String) {
    window.localStorage['accountId'] = accountId;
  }

  getToken(): String {
    return window.localStorage['token'];
  }

  saveToken(token: String) {
    window.localStorage['token'] = token;
  }

  destroySession() {
    window.localStorage.removeItem('accountId');
    window.localStorage.removeItem('token');
  }
}
