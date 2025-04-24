import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[noReact]',
  providers: [
    {
    provide: NG_VALIDATORS,
    useExisting: NoReactValidator,
    multi: true, // провайдят ng validators, чтобы при добавлении на формы нескольких не перибавлось
  }
  ]
})
export class NoReactValidator implements Validator {
  change!: () => void

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value.toLowerCase() === 'react'
    ? {noReact: {message: 'НИКАКИХ РЕАКТОВ!'}}
      : null
  }

  registerOnValidatorChange(fn: () => void): void {
  }

}
