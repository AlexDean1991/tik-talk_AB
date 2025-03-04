import {Component, input} from '@angular/core';
import {Comment} from '../../../../data/interface/post.interface';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-comment',
  imports: [
    AvatarCircleComponent
  ],
  templateUrl: './comment.component.html',
  standalone: true,
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
    comment = input<Comment>();
}
