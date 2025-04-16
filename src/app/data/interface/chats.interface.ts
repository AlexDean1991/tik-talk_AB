import {Profile} from './profile.interface';
import {ProfileService} from '../services/profile.service';

export interface Chat {
  id: number,
  userFirst: Profile
  userSecond: Profile
  messages: Message[]
  companion?: Profile
}

export interface Message {
  id: number
  userFromId: number
  personalChatId: number
  text: string
  createdAt: string
  isRead: boolean
  updatedAt: string
  user?: Profile
}

export interface LastMessageRes {
  id: number
  userFrom: Profile
  message: string
}
