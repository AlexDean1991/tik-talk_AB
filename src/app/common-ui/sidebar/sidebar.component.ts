import {Component, inject} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interface/profile.interface';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    // ImgUrlPipe,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
    // JsonPipe
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

    menuItems = [
      {
        label: 'Моя страница',
        icon: 'home',
        link: 'profile/me'
      },
      {
        label: 'Чаты',
        icon: 'chat',
        link: 'chats'
      },
      {
        label: 'Поиск',
        icon: 'search',
        link: 'search'
      },
      {
        label: 'MyPage',
        icon: 'search',
        link: 'mypage'
      }
    ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
