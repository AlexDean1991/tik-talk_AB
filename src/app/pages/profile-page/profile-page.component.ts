import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {SubscriberCardComponent} from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import {PostFeedComponent} from './post-feed/post-feed.component';
import {PostInputComponent} from './post-input/post-input.component';
import {ChatsService} from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    // NgForOf,
    // SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  standalone: true,
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  chatsService = inject(ChatsService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  me$ = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribersShortList(5)

  isMyPage = signal(false)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
        if (id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )

  async sendMessage(id: number) {
    firstValueFrom(this.chatsService.createChat(id))
      .then((res) => {
        this.router.navigate(['/chats', res.id])
      })
  }
}
