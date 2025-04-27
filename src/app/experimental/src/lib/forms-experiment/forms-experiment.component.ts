import {Component, inject} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MockService} from './mock.service';
import {Feature} from './mock.service';
import {AsyncPipe, KeyValuePipe} from '@angular/common';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

export interface Address {
    city?: string
    street?: string
    building?: number
    apartment?: number
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  })
}

@Component({
  selector: 'app-forms-experiment',
  imports: [ReactiveFormsModule, KeyValuePipe],
  standalone: true,
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
})
export class FormsExperimentComponent {

  // #fb = inject(FormBuilder) // можно делать формы так

  ReceiverType = ReceiverType

  mockService = inject(MockService)

  features: Feature[] = []


  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
  //   name: this.#fb.control<string>('', Validators.required),
  //   inn: this.#fb.control<number | null>(null),
  //   lastName: this.#fb.control<string>(''),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     building: this.#fb.control<number | null>(null),
  //     apartment: this.#fb.control<number | null>(null),
  //   })
  // })

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    // name: new FormControl<string>({value: '', disabled: true} Validators.required), // можно дизэблить так
    inn: new FormControl<number | null>(null),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]), // Вот здесь предоставляем вохможность добавлять формы.
    feature: new FormRecord({})

  });

  // в этом конструкторе мы подписываемся на изменение контрола
  constructor() {
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addrs => {
        // while (this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0)
        // }

        this.form.controls.addresses.clear()

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr))
        }

        // this.form.controls.addresses.setValue(addrs)
        // this.form.controls.addresses.setControl(1, getAddressForm(addrs[0])) // тут можно вставить данные с сервера по индексу з формы 0 в форму 1
        // this.form.controls.addresses.at(0) // можно взять данные из форм контрол по определенному индексу и уже проводить с ним какие-то операции
        // this.form.controls.addresses.disable() // дизэблим все формконтролы
      })
    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value))
        }
      })

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed()) // не забываем отписываться. Работает в новых ангулярах и только в конструкторе, потому что это Инжекшион контекст
      .subscribe(val => {
        console.log('type event')
        this.form.controls.inn.clearValidators()

        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators(
            [Validators.required, Validators.minLength(10),
              Validators.maxLength(10)])
        }
      })

    // this.form.valueChanges.subscribe(val => console.log(val))

    // или по-другому. Но в него необходимо передать полный объект.
    // Можно вызывать и у подформ, например у address
    // this.form.setValue({
    //   type: ReceiverType.LEGAL,
    //   name: 'Ivan',
    //   inn: 1234567890,
    //   lastName: 'Chiernyakov',
    //   address: {
    //     city: 'SPb',
    //     street: 'Central',
    //     building: 12,
    //     apartment: 3
    //   }
    //
    // })

    // или конкретное поле:
    // this.form.controls.address.controls.building.patchValue(23)
  }

  onSubmit(event: SubmitEvent) {
    this.form.reset()

    // this.form.markAllAsTouched()
    // this.form.updateValueAndValidity()
    //
    // if (this.form.invalid) return


    // this.form.reset({ // ресетит после онСабмит. Можно ресетить и отдельные контролы.
    //   name: 'Lucas'
    // }, {
    //   emitEvent
    //   onlySelf
    // })
// __________________________________
    // заплатка
    // const formPatch = {
    //   name: 'Ivan',
    //   lastName: 'Chiernyakov'
    // }
// ________________________________
    // можем вставить в форму. Отличается от Сета полнотой данных.
    // this.form.patchValue(ReceiverType.LEGAL {
    //
    //   // emitEvent: false // в этом случае все слушатели будут молчать
    //   // onlySelf: true // реагирует только этот форм контрол тайп
    //
    // })

    console.log('this form value', this.form.valid)
    console.log('get raw value', this.form.getRawValue()); // если дизэблим один из контролов, здесь он все равно приходит. Полезно, если в этот контрол, например, приходит значение с бэка.
  }

  addAddress() {
    // this.form.controls.addresses.push(getAddresForm())
    this.form.controls.addresses.insert(0, getAddressForm())
  }

  deleteAdress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false})

  }

  sort = () => 0
}
