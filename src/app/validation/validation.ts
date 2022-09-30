import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class Validation {
  static nameRegex = /^[a-z A-Z .]+$/;
  static alphaRegex = /^[a-z A-Z]+$/;

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let message = ''
    
    if (validatorName === 'invalidName') {
      message = "Only alphabets are allowed";
    }

    if (validatorName === 'required') {
      message = "Required";
    }

    if (validatorName === 'invalidAlphabets') {
      message = "Please Enter valid name";
    }

    return message;
  }

  static nameValidator(control: any) {
    return (control.value && control.value.match(Validation.alphaRegex)) ?
      null : { invalidAlphabets: true };
  }
 
  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control: any = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched();
        control.markAsDirty();
        control.markAsPending();
        control.setErrors(control.errors);
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          this.validateAllFormFields(control.controls[i] as FormGroup);
        }
      }
    });
  }

  static validateFormField(control: FormControl) {
    control.markAsTouched();
    control.markAsDirty();
    control.markAsPending();
    control.setErrors(control.errors);
  }
}