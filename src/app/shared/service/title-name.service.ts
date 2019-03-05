import { Injectable } from '@angular/core';
import { TitleName } from '../interfaces/title-name';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConstants } from '../constants/ApiConstants';



@Injectable()
export class TitleNameService {

  constructor(
    private http: HttpClient
  ) { }

  getTitleNames() {
    return this.http.get(ApiConstants.baseURl + '/titlenames')
      .pipe(
        map((res: any[]) => {
          return res['data'].map(data => {
            return {
              titleNameCode: data['id'],
              titleNameDisplay: data['display'],
              titleNameAbbr: data['name']
            }
          })
        })
      )
  }

  getTitleNamesV2() {
    return this.http.get(ApiConstants.baseURl + '/titlenames')
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data']
          }
        })
      )
  }

  updateTitleName(data) {
    //console.log(data,'update');
    return this.http.put(ApiConstants.baseURl + `/titlenames/${data['id']}`, data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          }
        })
      )

  }

  createTitleName(data) {
    return this.http.post(ApiConstants.baseURl + "/titlenames", data)
      .pipe(
        map(res=>{
          return {
            status: res['result'],
            data: res['data'][0]
          }
        })
      )
  }

  deleteTitleName(id){
    return this.http.delete(ApiConstants.baseURl+`/titlenames/${id}`)
    .pipe(
      map(res=>{
        return {
          status:res['result']
        }
      })
    )
  }

}
