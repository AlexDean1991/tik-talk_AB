import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  imports: [
    FormGroup,
  ],
  templateUrl: './settings-page.component.html',
  standalone: true,
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)

    form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      description: [''],
      stack: ['']
    })
}
