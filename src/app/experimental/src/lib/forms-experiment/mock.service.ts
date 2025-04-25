import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  http = inject(HttpClient)

  getAddresses() {
    return this.http.get('http://')
  }
}
