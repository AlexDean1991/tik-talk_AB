import { Component } from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
