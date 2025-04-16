import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chat, LastMessageRes, Message} from '../interface/chats.interface';
import {ProfileService} from './profile.service';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  http = inject(HttpClient)
  me = inject(ProfileService).me
  baseApiUrl =  'https://icherniakov.ru/yt-course/'
  chatUrl =   `${this.baseApiUrl}chat/`
  messageUrl =  `${this.baseApiUrl}message/`

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatUrl}${userId}`, {})
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatUrl}get_my_chats/`, {})
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatUrl}${chatId}`)
      .pipe(map(chat => {
        return {
          ...chat,
          companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
          messages: chat.messages.map((message: Message) => {
            return {
              ...message,
              user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond
            }
          })

        }
      }))
  }


  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(`${this.messageUrl}send/${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
