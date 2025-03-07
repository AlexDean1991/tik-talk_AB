import {Component, input} from '@angular/core';
import {PostComment} from '../../../../data/interface/post.interface';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';
import {TimeOfComments} from '../../../../helpers/pipes/time-of-comments.pipe';

@Component({
  selector: 'app-comment',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    TimeOfComments
  ],
  templateUrl: './comment.component.html',
  standalone: true,
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
    comment = input<PostComment>();
}
