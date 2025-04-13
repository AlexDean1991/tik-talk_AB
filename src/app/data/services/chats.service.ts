import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  http = inject(HttpClient)
  baseApiUrl =  'https://icherniakov.ru/yt-course/'
  chatUrl =   `${this.baseApiUrl}/chat/`
  messageUrl =  'https://icherniakov.ru/yt-course/message/'

  createChat(userId: number) {
    return this.http.post(`${this.chatUrl}${userId}`, {})
  }
}
