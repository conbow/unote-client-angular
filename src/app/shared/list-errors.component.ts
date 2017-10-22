import { Component, Input } from '@angular/core';

import { Errors } from './models';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];
  formattedFeedback: string;

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];
    this.formattedFeedback = errorList.feedback;

    if (errorList.errors) {
      for (const field in errorList.errors) {
        this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
      }
    }
  }

  get errorList() {
    return this.formattedErrors;
  }

  get feedback() {
    return this.formattedFeedback;
  }
}
