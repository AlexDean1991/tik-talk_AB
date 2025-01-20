import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interface/profile.interface';
import {BehaviorSubject, map, pipe, tap} from 'rxjs';
import {Pageble} from '../interface/pageble.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course'

  me = signal<Profile | null>(null)

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`)
  }

  // me = new BehaviorSubject<Profile | null>(null);

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`)
      .pipe(
      tap(res => this.me.set(res))
    )
  }

  // getAccount(id: string) {
  //   return this.http.get<Profile>(`${this.baseApiUrl}/account/${id}`)
  // }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
    .pipe(
      map(res => res.items.slice(0, 3))
    )
  }

}

  // patchProfile(profile: Partial<Profile>) {
  //   return this.patch<Profile>(
  //     `${this.baseApiUrl}account/me`,
  //   )
  // }



