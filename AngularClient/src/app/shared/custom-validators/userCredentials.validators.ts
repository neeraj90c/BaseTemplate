import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidation(usernameInitialValue: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const usernameChanged = control.get('userName')?.value !== usernameInitialValue;
    const password = control.get('userPassword')?.value;

    if (usernameChanged && password?.trim() === '') {
        console.log("validation file log");
        
      return { 'passwordRequired': true };
    }

    return null;
  };
}
