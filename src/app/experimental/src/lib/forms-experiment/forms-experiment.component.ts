import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

function getAddresForm() {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    appartment: new FormControl<number | null>(null),
  })
}

@Component({
  selector: 'app-forms-experiment',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
})
export class FormsExperimentComponent {

  #fb = inject(FormBuilder) // можно делать формы так

  ReceiverType = ReceiverType

  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
  //   name: this.#fb.control<string>('', Validators.required),
  //   inn: this.#fb.control<number | null>(null),
  //   lastName: this.#fb.control<string>(''),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     building: this.#fb.control<number | null>(null),
  //     appartment: this.#fb.control<number | null>(null),
  //   })
  // })

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    // name: new FormControl<string>({value: '', disd: true} Validators.required), // можно дизэблить так
    inn: new FormControl<number | null>(null),
    lastName: new FormControl<string>(''),
    address: getAddresForm()
  });

  // в этом конструкторе мы подписываемся на изменение контрола
  constructor() {
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
    //     appartment: 3
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
}
