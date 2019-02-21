import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleName } from '../interfaces/title-name';


@Injectable()
export class TitleNameService {

  constructor() { }

  getTitleNames(): TitleName[] {
    return [
      { titleNameCode: '', titleNameDisplay: 'กรุณาเลือกคำนำหน้า' },
      { titleNameCode: '01', titleNameDisplay: 'นาย' },
      { titleNameCode: '02', titleNameDisplay: 'นางสาว' }
    ];
  }

  getTitleName(id): TitleName {
    if (id == '01')
      return { titleNameCode: '01', titleNameDisplay: 'นาย' }
    else if (id == '02')
      return { titleNameCode: '02', titleNameDisplay: 'นางสาว' }
    return { titleNameCode: '', titleNameDisplay: 'กรุณาเลือกคำนำหน้า' }
  }
}
