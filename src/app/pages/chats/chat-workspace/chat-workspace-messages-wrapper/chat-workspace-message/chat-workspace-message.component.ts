import {Component, HostBinding, input} from '@angular/core';
import {Message} from '../../../../../data/interface/chats.interface';
import {AvatarCircleComponent} from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [
    AvatarCircleComponent,
    CommonModule
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrls: ['./chat-workspace-message.component.scss'],
  providers: [DatePipe]  // Добавление DatePipe в список providers
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }

  constructor(private datePipe: DatePipe) {}

  get trueTime(): string {
    const localDate = new Date(this.message().createdAt);
    localDate.setHours(localDate.getHours() + 3); // Корректно увеличиваем на 3 часа
    return this.datePipe.transform(localDate, 'HH:mm') ?? '';
  }

}
