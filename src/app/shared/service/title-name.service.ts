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
              titleNameDisplay: data['display']
            }
          })
        })
      )
  }

  getTitleNamesV2() {
    return this.http.get(ApiConstants.baseURl + '/titlenames')
      .pipe(
        map(res => {
          const data = res['data'].map(data => {
            return {
              titleNameCode: data['id'],
              titleNameDisplay: data['display'],
              titleNameAbbr: res['data'][0]['name']
            }
          })
          return {
            status: res['result'],
            data: data
          }
        })
      )
  }

  getTitleName(id): TitleName {
    if (id == '01')
      return { titleNameCode: '01', titleNameDisplay: 'นาย' }
    else if (id == '02')
      return { titleNameCode: '02', titleNameDisplay: 'นางสาว' }
    return { titleNameCode: '', titleNameDisplay: 'กรุณาเลือกคำนำหน้า' }
  }

  updateTitleName(data) {
    const body = {
      titleId: data['titleNameCode'],
      titleDisplay: data['titleNameDisplay'],
      titleName: data['titleNameAbbr']
    }
    return this.http.post(ApiConstants.baseURl + "/titlenames", body)
      .pipe(
        map(res => {
          const data = {
            titleNameAbbr: res['data'][0]['name'],
            titleNameCode: res['data'][0]['id'],
            titleNameDisplay: res['data'][0]['display'],
          }
          return {
            status: res['result'],
            data: data
          }
        })
      )

  }
}
