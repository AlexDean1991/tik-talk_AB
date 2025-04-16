import {Component, input} from '@angular/core';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {Chat, LastMessageRes} from '../../../data/interface/chats.interface';

@Component({
  selector: 'button[chats]',
  imports: [
    AvatarCircleComponent
  ],
  templateUrl: './chats-btn.component.html',
  standalone: true,
  styleUrl: './chats-btn.component.scss'
})
export class ChatsBtnComponent {
    chat = input<LastMessageRes>()
}
