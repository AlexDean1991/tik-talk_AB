import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {PostService} from '../../data/services/post.service';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {AvatarCircleComponent} from '../avatar-circle/avatar-circle.component';
import {FormsModule} from '@angular/forms';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-message-input',
  imports: [
    AvatarCircleComponent,
    FormsModule,
    SvgIconComponent,
    CommonModule
  ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  r2: Renderer2 = inject(Renderer2)
  me = inject(ProfileService).me

  @Output() created = new EventEmitter<string>()

  postText = ''

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return
    this.created.emit(this.postText);
    this.postText = ''
    }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.onCreatePost();
  }
  }

