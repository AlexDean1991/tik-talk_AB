import {Component, inject} from '@angular/core';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {ProfileService} from '../../../data/services/profile.service';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url.pipe';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircleComponent, CommonModule
  ],
  templateUrl: './post-input.component.html',
  standalone: true,
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  profile = inject(ProfileService).me

  constructor() {
    console.log(this.profile())
  }
}
