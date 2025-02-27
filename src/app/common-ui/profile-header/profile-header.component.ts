import {Component, input} from '@angular/core';
import {Profile} from '../../data/interface/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {AvatarCircleComponent} from '../avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-profile-header',
  imports: [
    AvatarCircleComponent
  ],
  templateUrl: './profile-header.component.html',
  standalone: true,
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<Profile>()

}
