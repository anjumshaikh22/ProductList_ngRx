import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validation } from './validation';

@Component({
  selector: 'app-validation',
  template: `{{errorMessage}}`
})

export class ValidationComponent {
  @Input() control!: FormControl;
  @Input() message: any;
  constructor() { }

  get errorMessage() {
    if (this.control && this.control.errors) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return Validation.getValidatorErrorMessage
            (propertyName, this.control.errors[propertyName]);
        }
      }

      return null;
    } else if (this.message) {
      return (Validation.getValidatorErrorMessage(this.message, 0));
    }
    return null;
  }

}
