import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Account, AccountService } from '../shared';

@Component({
  selector: 'account-page',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  account: Account = new Account();
  accountForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    // create form group using the form builder
    this.accountForm = this.fb.group({
      email: '',
      password: '',
      confirmPassword: ''
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateAccount(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current account's object to place in editable form fields
    (<any>Object).assign(this.account, this.accountService.getCurrentAccount());
    // Fill the form
    this.accountForm.patchValue(this.account);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateAccount(this.accountForm.value);

    this.accountService.update(this.account).subscribe(
      updatedAccount =>
        this.router.navigateByUrl('/account/' + updatedAccount.id),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateAccount(values: Object) {
    (<any>Object).assign(this.account, values);
  }

  deleteAccount() {
    this.isDeleting = true;

    this.accountService.delete(this.account.id).subscribe(success => {
      this.accountService.purgeAuth();
      this.router.navigateByUrl('/');
    });
  }
}
