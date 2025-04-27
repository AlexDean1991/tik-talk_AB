import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from './common-ui/profile-card/profile-card.component';
import {FormsModule, NgForm} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {NoReactValidator} from './no-react.validator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  person = {
    name: '',
    lastName: '',
    address: {
      street: '',
      building: 0
    }
  }

  onChange(value: string) {
      console.log(value)
    this.person.name = value
  }

  onSubmit(form: NgForm) {
    console.log(form)
  }
}
