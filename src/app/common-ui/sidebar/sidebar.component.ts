import { Component } from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {NgForOf} from '@angular/common';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent, NgForOf, SubscriberCardComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    menuItems = [
      {
        label: 'Моя страница',
        icon: 'home',
        link: ''
      },
      {
        label: 'Чаты',
        icon: 'chat',
        link: 'chat'
      },
      {
        label: 'Поиск',
        icon: 'search',
        link: 'search'
      }
    ]
}
