import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpClientService {

  constructor(
    private http: HttpClient
  ) {
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.set(
      // 'Authorization', `Bearer ${localStorage.getItem('access-token')}`
      'Authorization', 'asd'
    );
  }

  get(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }

  post(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }
}
