import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {MessageService, MenuItem} from 'primeng/api';
import {TitleNameService} from 'src/app/shared/service/title-name.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ManageUserService} from 'src/app/shared/service/manage-user.service';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  public formEdit: FormGroup;
  public menu: MenuItem[];
  public titleName: any[];
  public th: any;
  public yearRange: string;
  public detailWarning: string;
  public registerSuccess: boolean;
  public showCancelMessage: boolean;
  public urlback: string;
  public personalId: string;


  public formError = {
    username: '',
    password: '',
    repassword: '',
    titleName: '',
    fname: '',
    lname: '',
    birthday: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    phoneEmergency: ''
  };

  public validationMessage = {
    titleName: {
      datail: 'กรุณากรอก คำนำหน้า',
      required: 'คำนำหน้า*'
    },
    fname: {
      datail: 'กรุณากรอก ชื่อ',
      required: 'ชื่อ*'
    },
    lname: {
      datail: 'กรุณากรอก นามสกุล',
      required: 'นามสกุล*'
    },
    birthday: {
      datail: 'กรุณากรอก วันเกิด',
      required: 'วันเกิด*'
    },
    gender: {
      datail: 'กรุณากรอก เพศ',
      required: 'เพศ*'
    },
    address: {
      datail: 'กรุณากรอก ที่อยู่',
      required: 'ที่อยู่*'
    },
    phone: {
      datail: 'กรุณากรอก เบอร์โทร',
      required: 'เบอร์โทร*'
    },
    email: {
      datail: 'กรุณากรอก E-mail',
      required: 'E-mail*'
    },
    phoneEmergency: {
      datail: 'กรุณากรอก เบอร์ติดต่อฉุกเฉิน',
      required: 'เบอร์ติดต่อฉุกเฉิน*'
    }
  };


  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private titleService: TitleNameService,
    private router: Router,
    private manageUserService: ManageUserService,
    private route: ActivatedRoute,
    private breadCrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit() {
    this.personalId = this.route.snapshot.paramMap.get('id');
    this.urlback = this.route.snapshot.data.urlback;
    this.registerSuccess = false;
    this.showCancelMessage = false;
    this.createForm();
    this.settingForm();
    this.settingCalendarTH();
    this.titleService.getTitleNames().subscribe(
      res => {
        this.titleName = [
          {display: 'กรุณาเลือกคำนำหน้า'},
          ...res
        ];
      },
      err => {
        console.log(err['error']['message']);

      }
    );

    this.breadCrumbService.setPath([
      {label: 'Profile : ข้อมูลส่วนตัว', routerLink: ['/profile', localStorage.getItem('userId')]},
      {label: 'Edit Profile : แก้ไขข้อมูลส่วนตัว'},
    ]);
  }

  createForm() {
    this.formEdit = this.formBuilder.group(
      {
        titleName: ['', Validators.required],
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneEmergency: ['', Validators.required]
      }
    );
  }

  settingForm() {
    this.manageUserService.getUser(this.personalId)
      .subscribe(res => {
          const titlename = {
            id: res['data']['titleId'],
            display: res['data']['titleDisplay'],
            name: res['data']['titleName']
          };
          this.formEdit.controls['titleName'].patchValue(titlename);
          this.formEdit.controls['fname'].setValue(res['data']['fname']);
          this.formEdit.controls['lname'].setValue(res['data']['lname']);
          this.formEdit.controls['birthday'].setValue(new Date(res['data']['birthdate']));
          this.formEdit.controls['gender'].setValue(res['data']['genderId']);
          this.formEdit.controls['phone'].setValue(res['data']['tel']);
          this.formEdit.controls['email'].setValue(res['data']['email']);
          this.formEdit.controls['address'].setValue(res['data']['address']);
          this.formEdit.controls['phoneEmergency'].setValue(res['data']['emergencyTel']);
        },
        err => console.log(err['error']['message'])
      );
  }

  settingCalendarTH() {
    this.th = {
      firstDayOfWeek: 1,
      dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
      monthNames: ['มกราคม ', 'กุมภาพันธ์ ', 'มีนาคม ', 'เมษายน ',
        'พฤษภาคม  ', 'มิถุนายน ', 'กรกฎาคม ', 'สิงหาคม ',
        'กันยายน ', 'ตุลาคม ', 'พฤศจิกายน ', 'ธันวาคม '],
      today: 'Today',
      clear: 'Clear',
    };

    const currentYear = formatDate(new Date(), 'yyyy', 'en');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
  }

  onCancle() {

  }

  onSubmit(e) {
    console.log('onsubmit');

    if (!this.formEdit.valid) {
      this.subscribeInputMessageWaring();
      this.showMessage('warning');
    } else {
      console.log('test');

      const titleCode = this.formEdit.get('titleName').value;
      const dataUser = {
        fname: this.formEdit.get('fname').value,
        lname: this.formEdit.get('lname').value,
        birthdate: this.formEdit.get('birthday').value,
        address: this.formEdit.get('address').value,
        tel: this.formEdit.get('phone').value,
        emergencyTel: this.formEdit.get('phoneEmergency').value,
        email: this.formEdit.get('email').value,
        img: null,
        registerDate: null,
        lastUpdate: null,
        genderId: this.formEdit.get('gender').value,
        titleId: parseInt(titleCode.id),
      };
      this.manageUserService.updateUser(this.personalId, dataUser).subscribe(
        res => {
          console.log(res);

          if (res['status'] === 'Success') {
            this.showMessage('success');
          } else {
            this.showMessage('err');
          }
        },
        err => {
          console.log(err['error']['message']);
        }
      );

    }
  }

  showMessage(type) {
    this.messageService.clear();
    if (type === 'warning') {
      this.messageService.add(
        {
          key: 'systemMessage',
          sticky: true,
          summary: 'ข้อความจากระบบ',
          detail: this.detailWarning
        }
      );
    } else if (type === 'success') {
      this.registerSuccess = true;
      this.messageService.add(
        {
          key: 'systemMessage',
          sticky: true,
          summary: 'สมัครสมาชิกสำเร็จ',
        }
      );
    } else if (type === 'cancel') {
      this.showCancelMessage = true;
      this.messageService.add(
        {
          key: 'systemMessage',
          sticky: true,
          summary: 'ยกเลิกการสมัครสมาชิก',
          detail: 'คุณต้องการยกเลิกใช่หรือไม่'
        }
      );
    } else if (type === 'err') {
      this.messageService.add(
        {
          key: 'systemMessage',
          sticky: true,
          summary: 'ยกเลิกการสมัครสมาชิก',
          detail: 'คุณต้องการยกเลิกใช่หรือไม่'
        }
      );
    }

  }

  onCancel() {
    this.router.navigateByUrl(this.urlback + this.personalId);
  }

  onReject() {
    if (this.registerSuccess) {
      this.router.navigateByUrl(this.urlback + this.personalId);
    }
    this.messageService.clear('systemMessage');
    this.showCancelMessage = false;
  }

  showCancel() {
    this.showMessage('cancel');
  }


  profileSelect(e) {
    console.log(e);
    console.log(e.files);

  }

  subscribeInputMessageWaring() {
    this.formEdit
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.waringMessage());
    this.waringMessage();
  }

  waringMessage() {
    if (!this.formEdit) {
      return;
    }
    this.detailWarning = '';
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formEdit.get(field);
      if (field === 'repassword' && control.value !== '' && control.value !== this.formEdit.get('password').value) {
        this.detailWarning += 'กรุณากรอก รหัสผ่านให้ตรงกัน' + '\n';
        this.formEdit.controls[field].setValue('');
        this.formError[field] = this.validationMessage[field].required;
      } else if (control && !control.valid) {
        this.detailWarning += this.validationMessage[field].datail + '\n';
        this.formError[field] = this.validationMessage[field].required;
      }
    }
  }

  clear() {
    this.settingForm();
  }
}
