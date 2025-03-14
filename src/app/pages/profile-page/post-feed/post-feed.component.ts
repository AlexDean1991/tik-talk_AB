import {Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../../data/services/post.service';
import {debounceTime, firstValueFrom, fromEvent} from 'rxjs';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {
  postService = inject(PostService)
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)
  feed = this.postService.posts


  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Здесь используем fromEvent для оптимизации через debounceTime
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))  // Ждем 200 мс после последнего события
      .subscribe(() => {
        this.resizeFeed();
      });
  }


  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .subscribe(() => {
        console.log
      })
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 3 - 3

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }
}
