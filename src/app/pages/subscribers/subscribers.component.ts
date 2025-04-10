import { Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interface/profile.interface';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';

@Component({
  selector: 'app-subscribers',
  standalone: true, // 🔧 важно!
  imports: [
    CommonModule,         // 🔧 для *ngFor и др.
    ProfileCardComponent  // 🔧 для отображения карточек
  ],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.scss'
})
export class SubscribersComponent implements OnInit {

  profileService = inject(ProfileService);
  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  subscribers: Profile[] = [];

  ngOnInit() {
    this.profileService.getAllSubscribers().subscribe((subs: Profile[]) => {
      this.subscribers = subs;
    });

    this.resizeFeed();
  }


  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 6;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
