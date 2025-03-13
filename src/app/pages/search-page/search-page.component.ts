import {Component, ElementRef, HostListener, inject, OnInit, Renderer2} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interface/profile.interface';
import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';
import {debounceTime, fromEvent} from 'rxjs';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})

export class SearchPageComponent implements OnInit {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  ngOnInit() {
    this.profileService.filterProfiles({}).subscribe()
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
