import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MockService} from '../forms-experiment/mock.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


    enum RecieverType {
      Bugulma = 'Bugulma',
      Almet = 'Almet',
      Leninogorsk = 'Leninogorsk',
      Bavly = 'Bavly'
    }

    interface Address {
      city?: string
      street?: string
      building?: number
      appartment?: number
    }

function getAddressFrom(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    appartment: new FormControl<number | null>(initialValue.appartment ?? null),
  })
}


// как создавать свои валидаторы
const validateStartWith: ValidatorFn = (control: AbstractControl) => {
  return control.value?.startsWith('я')
  ? {startsWith: 'Я - последняя буква алфавита!'}
    : null
}

@Component({
  selector: 'app-my-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.scss'
})
export class MyFormComponent {

  RecieverType = RecieverType
  mockService = inject(MockService)

  form = new FormGroup({
    type: new FormControl<RecieverType>(RecieverType.Bugulma),
    name: new FormControl<string>('', [Validators.required, validateStartWith]),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressFrom()])
  })

  constructor() {
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addrs => {

        const addressArray = this.form.controls['addresses'] as FormArray;
        addressArray.clear();

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressFrom(addr))
        }

      })
  }


  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    console.log('this form value', this.form.valid)
    console.log('get raw value', this.form.getRawValue());
    this.form.reset()
  }
}
