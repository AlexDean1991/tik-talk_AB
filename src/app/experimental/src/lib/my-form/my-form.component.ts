import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';


    enum RecieverType {
      Bugulma = 'Bugulma',
      Almet = 'Almet',
      Leninogorsk = 'Leninogorsk',
      Bavly = 'Bavly'
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

  form = new FormGroup({
    type: new FormControl<RecieverType>(RecieverType.Bugulma),
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>(''),
    addresses: new FormGroup({
      city: new FormControl<string>(''),
      street: new FormControl<string>(''),
      building: new FormControl<number | null>(null),
      appartment: new FormControl<number | null>(null),

    })
  })


  onSubmit(event: SubmitEvent) {
    console.log('this form value', this.form.valid)
    console.log('get raw value', this.form.getRawValue());
    this.form.reset()
  }
}
