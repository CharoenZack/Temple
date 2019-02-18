import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleName } from '../interfaces/title-name';


@Injectable()
export class TitleNameService {

  constructor() { }

  getTitleName():TitleName[]{
    return [
      {titleNameCode:'01',titleNameDisplay:'นาย'},
      {titleNameCode:'02',titleNameDisplay:'นางสาว'},
    ];
  }
}
