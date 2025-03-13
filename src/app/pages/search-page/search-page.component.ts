import {Component, ElementRef, HostListener, inject, OnInit, Renderer2} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interface/profile.interface';
import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';

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
}
