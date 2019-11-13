import { SpecialApprove } from './../../shared/interfaces/special-approve';
import { CourseService } from './../courses/shared/course.service';
import { Component, OnInit } from '@angular/core';
import { Baggage } from 'src/app/shared/interfaces/baggage';
import { BaggageService } from 'src/app/shared/service/baggage.service';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MenuItem, ConfirmationService, Message } from 'primeng/api';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Button } from 'primeng/button';
import { LocationService } from '../location/location.service';
import { Course } from 'src/app/shared/interfaces/course';


@Component({
  selector: 'app-manage-storage',
  templateUrl: './manage-storage.component.html',
  styleUrls: ['./manage-storage.component.scss']
})
export class ManageStorageComponent implements OnInit {

  displayDialog: boolean;
  displayDialogEdit: boolean;
  items: Baggage[];
  newBaggage: boolean;
  baggage: Baggage;
  baggageNumber: String;
  locations: Location[];
  course: Course[];
  special: SpecialApprove[];
  cols: any[];
  public role: string;
  public menu: MenuItem[];
  public members: any[];
  public numberOfLocker: any[];
  public numberSelected: any[];
  public selectedMember: any;
  public selectedNumber: any;
  public selectedStatus: any;
  public formEdit: FormGroup;

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
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private locationService: LocationService,
    private courseService: CourseService

  ) {
  }

  ngOnInit() {

    // this.initDialogData();
    this.getData();
    this.getLockerByMhcAndSa();
    this.cols = [
      { field: 'createDate', header: 'วันที่' },
      { field: 'memberName', header: 'สมาชิก' },
      { field: 'number', header: 'หมายเลขตู้' },
      { field: 'status', header: 'สถานะ' },
      { field: 'memberId', header: 'รหัสผู้ใช้' },
      { field: 'baggageId', header: 'รหัสสัมภาระ' }
    ];

    this.breadCrumbService.setPath([
      { label: 'จัดการสัมภาระ', routerLink: '/storage' }
    ]);

    this.authService.getRole().subscribe(res => this.role = res);

    this.createForm();

  }
  createForm() {
    this.formEdit = this.formBuilder.group(
      {
        name: ['', Validators.required],
        lockerNumber: ['', Validators.required],
        locationName: ['', Validators.required],
        course: ['', Validators.required]

      }
    );
  }

  getLockerByMhcAndSa() {
    this.courseService.getLockerByMhcAndSa()
      .subscribe(res => {
        console.log(res);
        if (res['status'] === 'Success') {
          this.course = res['data'].map(res => {
            return {
              courseId: res['id'],
              courseName: res['name']
            };
          });
        }
      });
  }
  initDialogData(id) {
    console.log(id);

    this.locationService.getLockerByLocation(id.value.courseId)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.locations = res['data'].map(res => {
            return {
              locationId: res['id'],
              locationName: res['name']
            }
          });
        }
      });
    // แสดง member
    console.log(id);

    this.memberService.getMemberLocker(id.value.courseId)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.members = res['data'].map(res => {
            return {
              memberId: res['id'],
              memberName: res['titleName'] + ' ' + res['fname'] + '  ' + res['lname']
            };
          });
        }
      },
        err => {
          console.log(err);

        }
      );


  }
  getLocker(id) {
    this.baggageService.getLocker(id.value.locationId)
      .subscribe(
        res => {
          console.log(res);
          if (res['status'] === 'Success') {
            this.numberOfLocker = res['data'].map(res => {
              return {
                baggageId: res['number'],
                number: res['number'],
                locationId: res['locationId']
              };
            });
          }
        }
      );
  }
  // แสดงหมายเลขตู้
  private getData() {
    this.baggageService.getItems().subscribe(
      res => {
        if (res['status'] === 'Success') {
          this.items = res['data'];
          console.log(this.items);
          console.log(res['data'][0]['baggageId']);

        }
      },
      (e) => console.log(e['error']['message'])
    );
  }

  showEditButton(...role) {
    return role.includes(this.role);
  }

  showEdit(id, button: Button) {
    console.log(id);

    this.newBaggage = false;
    this.baggage = this.items.filter(e => e.baggageId === id)[0];
    console.log(this.baggage);
    this.selectedMember = {
      memberId: this.baggage['memberId'],
      memberName: this.baggage['memberName']
    };
    this.selectedNumber = {
      baggageId: this.baggage['baggageId'],
      number: this.baggage['number']

    };
    console.log('0' + this.selectedMember.memberName);

    console.log('1' + this.selectedNumber.baggageId);

    // 0 = ว่าง , 1 = กำลังใช้งาน
    const baggageStatus = this.baggage['status'];
    this.selectedStatus = {};
    if (baggageStatus === '0') {
      this.selectedStatus.label = 'ฝาก';
      button.disabled = false;
    } else {
      this.selectedStatus.label = 'รับคืนแล้ว';
      button.disabled = true;
    }
    this.selectedStatus.val = baggageStatus;

    this.displayDialogEdit = true;
  }

  delete(id) {
    const index = this.items.findIndex(e => e.baggageId === id);
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

    if ((this.selectedMember && this.selectedNumber) != null) {
      if (this.selectedMember && this.selectedNumber) {
        const data = {
          memberId: this.selectedMember['memberId'],
          number: this.selectedNumber['baggageId'],
          locationId: this.selectedNumber['locationId']
        };
        console.log(data);


        this.baggageService.saveStorage(data)
          .subscribe(res => {

            if (res['status'] === 'Success') {
              this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระสำเร็จ' }];
              this.getData();
            } else {
              this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ' }];
            }
          },
            (err) => {
              this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ' }];
            },
            () => {
              this.selectedMember = [];
              this.selectedNumber = [];
            }
          );
      }

    } else {
      this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสัมภาระไม่สำเร็จ' }];
      this.displayDialog = true;
    }
  }

  update(id) {
    console.log(id);
    this.msgs = [];
    this.displayDialog = false;
    const data = {
      memberId: this.selectedMember['memberId'],
      baggageId: this.selectedNumber['baggageId'],
      status: this.selectedStatus['val'],
    };
    console.log(data.baggageId);
    console.log(data.memberId);
    console.log(data.status);
    this.baggageService.updateStorage(id, data).subscribe(res => {

      if (res['status'] === 'Success') {
        this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'แก้ไขสัมภาระสำเร็จ' }];
        const index = this.items.findIndex(e => e.baggageId === res['data']['baggageId']);
        console.log(index);
        const newData = this.items[index];
        newData.status = data.status;
        newData.baggageId = data.baggageId;
        newData.memberId = data.memberId;
        console.log(newData);

        this.clear();

      } else {
        this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'แก้ไขสัมภาระไม่สำเร็จ' }];
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
    this.displayDialogEdit = false;
    this.formEdit.reset();
  }


  showDialogToAdd() {
    this.newBaggage = true;
    this.baggage = { lockerNumber: '', baggageId: '' };
    this.displayDialog = true;
  }
}

