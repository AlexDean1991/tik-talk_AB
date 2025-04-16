import {Component, inject} from '@angular/core';
import {ChatsBtnComponent} from '../chats-btn/chats-btn.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatsService} from '../../../data/services/chats.service';
import {AsyncPipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {map, startWith, switchMap} from 'rxjs';

@Component({
  selector: 'app-chats-list',
  imports: [
    ChatsBtnComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {

  chatsService = inject(ChatsService);

  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap(chats =>
      this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map(inputValue =>
          chats.filter(chat => {
            return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
              .toLowerCase()
              .includes((inputValue ?? '').toLowerCase())
          })
        )
      )
    )
  );

}
