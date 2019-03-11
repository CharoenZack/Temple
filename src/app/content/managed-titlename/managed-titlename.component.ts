import {Component, OnInit} from '@angular/core';
import {TitleName} from '../../shared/interfaces/title-name';
import {TitleNameService} from 'src/app/shared/service/title-name.service';

@Component({
  selector: 'app-managed-titlename',
  templateUrl: './managed-titlename.component.html',
  styleUrls: ['./managed-titlename.component.css']
})
export class ManagedTitlenameComponent implements OnInit {

  displayDialog: boolean;
  newtitleName: boolean;
  titleName: TitleName;
  titleNames: TitleName[];
  titleNameEdit: String;
  titleNameAbbrEdit: String;
  cols: any[];

  constructor(
    private titleNamesService: TitleNameService
  ) {
  }

  ngOnInit() {

    this.getTitleName();
    this.cols = [
      {field: 'display', header: 'คำนำหน้า'}, {field: 'name', header: 'คำย่อ'}
    ];
  }

  getTitleName() {
    this.titleNamesService.getTitleNamesV2()
      .subscribe(res => {
        console.log(res, 'names');
        if (res['status'] === 'Success') {
          this.titleNames = res['data'];
        }
      });
  }

  showDialogToAdd() {
    this.newtitleName = true;
    this.titleName = {};
    this.displayDialog = true;
  }

  save() {
    this.titleName.display = this.titleNameEdit;
    this.titleName.name = this.titleNameAbbrEdit;

    this.titleNamesService.createTitleName(this.titleName)
      .subscribe(res => {
        if (res['status'] == "Success") {
          this.titleNames = [
            ...this.titleNames,
            res['data']
          ]
        }
      },
        (e) => console.log(e['error']['message'])
      );
    this.clear();
  }

  clear() {
    this.titleName = {};
    this.displayDialog = false;
    this.titleNameEdit = '';
    this.titleNameAbbrEdit = '';
  }

  update() {
    this.titleName.display = this.titleNameEdit;
    this.titleName.name = this.titleNameAbbrEdit;
    this.titleNamesService.updateTitleName(this.titleName)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          const index = this.titleNames.findIndex(e => e.id == res['data']['id']);
          console.log(res['data'], 'new');
          console.log(this.titleNames[index], 'old');

          this.titleNames[index] = res['data'];
        }
      },
        (e) => console.log(e['error']['message'])
      );
    this.clear();
  }

  showEdit(id) {
    this.newtitleName = false;
    this.titleName = this.titleNames.filter(e => e.id === id)[0];
    this.titleNameEdit = this.titleName['display'];
    this.titleNameAbbrEdit = this.titleName['name'];
    this.displayDialog = true;
  }

  delete(id) {
    console.log(id, 'delete');

    const index = this.titleNames.findIndex(e => e.id === id);
    this.titleNamesService.deleteTitleName(id)
      .subscribe(res => {
        if (res['status'] == "Success") {
          this.titleNames = [
            ...this.titleNames.slice(0, index),
            ...this.titleNames.slice(index + 1)
          ]
        }
      },
        (e) => console.log(e['error']['message'])
      )
  }
}
