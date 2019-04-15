import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ApiConstants} from '../constants/ApiConstants';
import { AuthService } from './auth.service';

@Injectable()
export class ManageUserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  createUser(dataUser) {
    return this.http.post(ApiConstants.baseURl + '/auth/register',
      dataUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      }).pipe(
      map(res => {
          return {
            status: res['result'],
          };
        }
      )
    );

  }

  getUser(id) {
    return this.http.get(ApiConstants.baseURl + `/members/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        return {
          status: res['result'],
          data: res['data'][0]
        };
      })
    );
  }

  getAllUsers() {
    return this.http.get(ApiConstants.baseURl + '/members', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        const data = res['data']
          .map(member => {
            return {
              id: member['id'],
              titleName: member['titleName'],
              fname: member['fname'],
              lname: member['lname']
            };
          });
        return {
          status: res['result'],
          data: data
        };
      })
    );
  }

  updateUser(id, dataUser) {
    const data = {
      ...dataUser,
    };
    return this.http.put(ApiConstants.baseURl + `/members/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result'],
          res: res
        };
      }));
  }

  deleteUser(id) {
    return this.http.delete(ApiConstants.baseURl + `/members/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result']
        };
      })
    );
  }
}
