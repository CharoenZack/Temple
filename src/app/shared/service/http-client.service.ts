import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpClientService {

  constructor(
    private http: HttpClient
  ) {
  }



  get(url) {
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }

  post(url, data) {
    return this.http.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }

  
  put(url, data) {
    return this.http.put(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }

  patch(url, data) {
    return this.http.patch(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }

  
  delete(url) {
    return this.http.delete(url,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }
}
