import { Component, OnInit } from '@angular/core';

import { Account } from '../models';
import { AccountService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  currentAccount: Account;

  ngOnInit() {
    this.accountService.currentAccount.subscribe(accountData => {
      this.currentAccount = accountData;
    });
  }
}
