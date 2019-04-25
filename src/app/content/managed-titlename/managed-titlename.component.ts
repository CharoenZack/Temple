import { Component, OnInit } from '@angular/core';
import { TitleName } from '../../shared/interfaces/title-name';
import { TitleNameService } from 'src/app/shared/service/title-name.service';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';


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
  public menu: MenuItem[];
  public msgs: Message[] = [];

  constructor(
    private titleNamesService: TitleNameService,
    private breadCrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.breadCrumbService.setPath([
      { label: 'Title names management: จัดการคำนำหน้าทั้งหมด', routerLink: '/manageTitlename' },
    ]);

    this.getTitleName();
    this.cols = [
      { field: 'display', header: 'คำนำหน้า' }, { field: 'name', header: 'คำย่อ' }
    ];

    this.menu = [
      { label: '', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Approval user : อนุมัติพิเศษ' },
    ];
  }

  getTitleName() {
    this.titleNamesService.getTitleNamesV2()
      .subscribe(
        res => {
          console.log(res, 'names');
          if (res['status'] === 'Success') {
            this.titleNames = res['data'];
            //this.msgs.push({severity:'success', summary:'ข้อความจากระบบ', detail:'การดำเนินการสำเร็จ'});
          }
        },
        err => {
          console.log(err['error']['message']);
          //this.msgs.push({severity:'error', summary:'ข้อความจากระบบ', detail:'การดำเนินการสำเร็จ'});
        }
      );
  }

  showDialogToAdd() {
    this.newtitleName = true;
    this.titleName = {};
    this.displayDialog = true;
  }

  save() {
    this.msgs = [];
    this.titleName.display = this.titleNameEdit;
    this.titleName.name = this.titleNameAbbrEdit;

    this.titleNamesService.createTitleName(this.titleName)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
          this.titleNames = [
            ...this.titleNames,
            res['data']
          ];
        }
      },
        (e) => {
          console.log(e['error']['message'])
          this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการไม่สำเร็จ' });
        }
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
    this.msgs = [];
    this.titleName.display = this.titleNameEdit;
    this.titleName.name = this.titleNameAbbrEdit;
    this.titleNamesService.updateTitleName(this.titleName)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
          const index = this.titleNames.findIndex(e => e.id === res['data']['id']);
          console.log(res['data'], 'new');
          console.log(this.titleNames[index], 'old');

          this.titleNames[index] = res['data'];
        }
      },
        (e) => {
          console.log(e['error']['message'])
          this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการไม่สำเร็จ' });
        }
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
    //console.log(id, 'delete');
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการลบ',
      header: 'ข้อความจากระบบ',
      accept: () => {
        const index = this.titleNames.findIndex(e => e.id === id);
        this.titleNamesService.deleteTitleName(id)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบสำเร็จ' });
              this.titleNames = [
                ...this.titleNames.slice(0, index),
                ...this.titleNames.slice(index + 1)
              ];
            }
          },
            (e) => {
              console.log(e['error']['message']);
              this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบไม่สำเร็จ' });
            }
          );
      },
      reject: () => {

      }
    })
  }
}

