import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Post, PostComment} from '../../../data/interface/post.interface';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from './comment/comment.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {TimeOfComments} from '../../../helpers/pipes/time-of-comments.pipe';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    // DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    TimeOfComments
  ],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
    post = input<Post>()

    comments = signal<PostComment[]>([])

    postService = inject(PostService)

    async ngOnInit() {
        this.comments.set(this.post()!.comments)
    }

  async onCreated() {
      const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
      this.comments.set(comments)
  }

}
