import {Component, input} from '@angular/core';
import {Message} from '../../../../../data/interface/chats.interface';
import {AvatarCircleComponent} from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [
    AvatarCircleComponent,
    DatePipe
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>()
}
