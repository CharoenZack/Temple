import {Component, OnInit} from '@angular/core';
import {Baggage} from 'src/app/shared/interfaces/baggage';
import {BaggageService} from 'src/app/shared/service/baggage.service';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';
import {AuthService} from 'src/app/shared/service/auth.service';
import {MenuItem, ConfirmationService, Message} from 'primeng/api';
import {ManageUserService} from 'src/app/shared/service/manage-user.service';


@Component({
  selector: 'app-manage-storage',
  templateUrl: './manage-storage.component.html',
  styleUrls: ['./manage-storage.component.scss']
})
export class ManageStorageComponent implements OnInit {


  displayDialog: boolean;
  items: Baggage[];
  newBaggage: boolean;
  baggage: Baggage;
  baggageNumber: String;
  cols: any[];
  public role: string;
  public menu: MenuItem[];
  public members: any[];
  public numberOfLocker: any[];
  public selectedMember: any;
  public selectedNumber: any;
  public selectedStatus: any;
  public msgs: Message[] = [];
  public status = [
    { val: '0', label: 'ฝาก' },
    { val: '1', label: 'รับคืนแล้ว' }
  ];

  constructor(
    private baggageService: BaggageService,
    private breadCrumbService: BreadcrumbService,
    private authService: AuthService,
    private memberService: ManageUserService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit() {
    this.initDialogData();
    this.getData();

    this.cols = [
      {field: 'createDate', header: 'วันที่'},
      {field: 'memberName', header: 'สมาชิก'},
      {field: 'number', header: 'หมายเลขตู้'},
      {field: 'status', header: 'สถานะ'}
    ];

    this.breadCrumbService.setPath([
      { label: 'Baggage management: จัดการสัมพาระ', routerLink: '/storage' }
    ]);

    this.authService.getRole().subscribe(res => this.role = res);
  }

  private initDialogData() {
    this.memberService.getAllUsers()
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.members = res['data'].map(res => {
            return {
              memberId: res['id'],
              memberName: res['titleName'] + res['fname'] + '  ' + res['lname']
            };
          });
        }
      },
        err => {
          console.log(err);

        }
      );

    this.baggageService.getItem()
      .subscribe(
        res => {
          if (res['status'] === 'Success') {
            this.numberOfLocker = res['data'].map(res => {
              return {
                baggageId: res['number'],
                number: res['locationName']+'  '+res['number'],
                locationId: res['locationId']
              }
            })
          }
        }
      );
  }

  private getData() {
    this.baggageService.getItems().subscribe(
      res => {
        if (res['status'] === 'Success') {
          this.items = res['data'];
          console.log(this.items);
        }
      },
      (e) => console.log(e['error']['message'])
    );
  }

  showEditButton(...role) {
    return role.includes(this.role);
  }

  showEdit(id) {
    console.log(id);
    this.newBaggage = false;
    this.baggage = this.items.filter(e => e.id == id)[0];
    console.log(this.baggage);
    this.selectedMember = {
      memberId: this.baggage['memberId'],
      memberName: this.baggage['memberName']
    };
    this.selectedNumber = {
      baggageId: this.baggage['baggageId'],
      number: this.baggage['number']
    };
    this.selectedStatus = {
      val: this.baggage['status'],
      label: this.baggage['status'] === '0' ? 'ฝาก' : 'รับคืนแล้ว'
    };

    this.displayDialog = true;
  }

  delete(id) {
    const index = this.items.findIndex(e => e.id === id);
    console.log(index);
    this.baggageService.delete(id).toPromise()
      .then(res => {
        if (res['status'] === 'Success') {
          this.items = [
            ...this.items.slice(0, index),
            ...this.items.slice(index + 1)
          ];
        }
      }).catch((e) => console.log(e['error']['message']));


  }

  save() {
    this.msgs = [];
    this.displayDialog = false;
    console.log(this.selectedNumber);
    
    if (this.selectedMember && this.selectedNumber) {
      const data = {
        memberId: this.selectedMember['memberId'],
        number: this.selectedNumber['baggageId'],
        locationId: this.selectedNumber['locationId']
      }
      console.log(data);
      

      this.baggageService.saveStorage(data)
        .subscribe(res => {

            if (res['status'] === 'Success') {
              this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระสำเร็จ'}];
              this.getData();
            } else {
              this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ'}];
            }
          },
          (err) => {
            this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ'}];
          },
          () => {
            this.selectedMember = [];
            this.selectedNumber = [];
          }
        );
    } else {
      this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ'}];
    }

  }

  update(id) {
    this.msgs = [];
    this.displayDialog = false;
    const data = {
      memberId: this.selectedMember['memberId'],
      baggageId: this.selectedNumber['baggageId'],
      status: this.selectedStatus['val'],
    };
    this.baggageService.updateStorage(id, data).subscribe(res => {

      if (res['status'] === 'Success') {
        this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระสำเร็จ' }];
        const index = this.items.findIndex(e => e.id === res['data']['baggageId']);
        console.log(index);
        const newData = this.items[index];
        newData.status = data.status;
        newData.id = data.baggageId;
        newData.memberId = data.memberId;
        console.log(newData);
        this.items = [
          ...this.items.slice(0, index - 1),
          newData,
          ...this.items.slice(index + 1)
        ];
        this.clear();

      } else {
        this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ' }];
      }
    },
      err => {
        this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ' }];
      }
    );
  }

  clear() {
    this.selectedMember = [];
    this.selectedNumber = [];
    this.selectedStatus = [];
    this.displayDialog = false;
  }


  showDialogToAdd() {
    this.newBaggage = true;
    this.baggage = {number: '', id: ''};
    this.displayDialog = true;
  }
}

