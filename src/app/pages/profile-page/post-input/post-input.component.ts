import {Component, HostBinding, inject, input, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {ProfileService} from '../../../data/services/profile.service';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url.pipe';
import {CommonModule} from '@angular/common';
import {style} from '@angular/animations';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircleComponent,
    CommonModule,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  standalone: true,
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  r2:Renderer2 = inject(Renderer2)
  postService = inject(PostService)
  isCommentInput = input(false)
  postId = input<number>(0)
  profile = inject(ProfileService).me

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput
  }

  postText = ''

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return

    if (this.isCommentInput()) {
      firstValueFrom(this.postService.createComment( {
        text: this.postText,
        authorId: this.profile()!.id,
        postId: this.postId()
      })).then(() => {
        this.postText = ''
      })
      return;
    }


  }
}
