import {Component, computed, ElementRef, inject, input, signal, ViewChild} from '@angular/core';
import {ChatWorkspaceMessageComponent} from './chat-workspace-message/chat-workspace-message.component';
import {MessageInputComponent} from '../../../../common-ui/message-input/message-input.component';
import {ChatsService} from '../../../../data/services/chats.service';
import {Chat, Message} from '../../../../data/interface/chats.interface';
import {firstValueFrom, Subscription, switchMap, timer} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent,
    CommonModule
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  chatService = inject(ChatsService)

  chat = input.required<Chat>()

  messages = this.chatService.activeChatMessages

  // Группировка сообщений по дням
  groupMessages = computed(() => {
    const messages = this.messages();
    const grouped: { [key: string]: Message[] } = {};

    const now = new Date();

    for (const message of messages) {
      const date = new Date(message.createdAt); // Преобразуем строку в Date
      const localDate = new Date(date.getTime() + 3 * 60 * 60 * 1000); // Добавляем 3 часа (для Москвы)

      const timeDiff = now.getTime() - localDate.getTime(); // Разница во времени между текущей датой и датой сообщения
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Разница в днях

      let groupKey = '';
      if (dayDiff === 0) {
        groupKey = 'Сегодня';
      } else if (dayDiff === 1) {
        groupKey = 'Вчера';
      } else if (dayDiff > 1 && dayDiff < 7) {
        groupKey = `${dayDiff} дней назад`; // Для сообщений, старше одного дня, но не старее недели
      } else {
        groupKey = localDate.toDateString(); // Для более старых сообщений просто дата
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(message); // Добавляем сообщение в соответствующую группу
    }

    return grouped;
  });

  private refreshChat!: Subscription;

  ngOnInit(): void {
    this.refreshChat = timer(0, 5000).pipe(
      switchMap(() => this.chatService.getChatById(this.chat().id))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.refreshChat?.unsubscribe();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Не удалось заскроллить:', err)
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatService.sendMessage(this.chat().id, messageText));
    await firstValueFrom(this.chatService.getChatById(this.chat().id));
  }

  objectKeys(obj: { [key: string]: any }): string[] {
    return Object.keys(obj);
  }
}
