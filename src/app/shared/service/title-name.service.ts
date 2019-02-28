import { Injectable } from '@angular/core';
import { TitleName } from '../interfaces/title-name';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class TitleNameService {

  constructor(
    private http: HttpClient
  ) { }

  getTitleNames() {
    return this.http.get('http://localhost:3999/api/v1/titlenames')
      .pipe(
        map((res:any[]) => {
          return res.map(data=>{
            return {
              titleNameCode: data['id'],
              titleNameDisplay: data['display']
            }
          })
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
}
