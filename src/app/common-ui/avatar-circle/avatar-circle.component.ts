import {Component, input, OnInit} from '@angular/core';
import {Profile} from '../../data/interface/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-avatar-circle',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './avatar-circle.component.html',
  standalone: true,
  styleUrl: './avatar-circle.component.scss'
})
export class AvatarCircleComponent implements OnInit{
  avatarUrl = input<string | null>(null)
  constructor(){

  }

  ngOnInit(){
    console.log(this.avatarUrl())
  }

}
