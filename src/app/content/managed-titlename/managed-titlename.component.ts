import { Component, OnInit } from '@angular/core';
import { TitleName } from '../../shared/interfaces/title-name';

@Component({
  selector: 'app-managed-titlename',
  templateUrl: './managed-titlename.component.html',
  styleUrls: ['./managed-titlename.component.css']
})
export class ManagedTitlenameComponent implements OnInit {

  displayDialog: boolean;
  newtitleName: boolean;
  titleName: TitleName = {};
  titleNames: TitleName[];
  cols: any[];
  constructor() { }

  ngOnInit() {

    this.titleNames = this.getTitleName()
    this.cols = [
      { field: 'titleNameDisplay', header: 'คำนำหน้า' },
    ]
  }

  getTitleName(): TitleName[] {
    const titleNames = [
      { titleNameCode: "1", titleNameDisplay: "ตร" },
      { titleNameCode: "2", titleNameDisplay: "พท" },
      { titleNameCode: "3", titleNameDisplay: "นพ" }
    ]
    return titleNames;
  }

  showDialogToAdd() {
    this.newtitleName = true;
    this.titleName = {};
    this.displayDialog = true;
  }

  save() {
    let titleNames = [...this.titleNames];
    if (this.newtitleName)
      titleNames.push(this.titleName);
    this.titleNames = titleNames;
    this.titleName = null;
    this.displayDialog = false;
  }
  clear() {
    this.titleName = {};
  }

}
