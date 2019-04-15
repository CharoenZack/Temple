import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TitleNameService } from 'src/app/shared/service/title-name.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public formRegister: FormGroup;
  public menu: MenuItem[];
  public titleName: any[];
  public th: any;
  public yearRange: string;
  public detailWarning: string;
  public registerSuccess: boolean;
  public showCancelMessage: boolean;
  public urlback:string;

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
    username: {
      datail: 'กรุณากรอก Username',
      required: 'Username*'
    },
    password: {
      datail: 'กรุณากรอก Password',
      required: 'Password*'
    },
    repassword: {
      datail: 'กรุณากรอก Re-password',
      required: 'Re-password*'
    },
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
  }



  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private titleService: TitleNameService,
    private router: Router,
    private manageUserService: ManageUserService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.urlback = this.route.snapshot.data.urlback;   
    this.registerSuccess = false;
    this.showCancelMessage = false;
    this.createForm();
    this.settingCalendarTH();
    this.titleService.getTitleNames().subscribe(
      res => {
        this.titleName = [
          //{ display: 'กรุณาเลือกคำนำหน้า' },
          ...res
        ];
      },
      err => {
        console.log(err['error']['message']);

      }
    )

    this.menu = [
      { label: 'Login', url: 'auth/login' },
      { label: 'Register : สมัครสมาชิก' },
    ];
  }

  createForm() {
    this.formRegister = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        repassword: ['', [Validators.required, Validators.minLength(5)]],
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

    if (!this.formRegister.valid) {
      this.subscribeInputMessageWaring();
      this.showMessage('warning');
    } else {
      console.log('test');

      const titleCode = this.formRegister.get('titleName').value;
      const dataUser = {
        username: this.formRegister.get('username').value,
        password: this.formRegister.get('password').value,
        fname: this.formRegister.get('fname').value,
        lname: this.formRegister.get('lname').value,
        birthdate: this.formRegister.get('birthday').value,
        address: this.formRegister.get('address').value,
        tel: this.formRegister.get('phone').value,
        emergencyTel: this.formRegister.get('phoneEmergency').value,
        email: this.formRegister.get('email').value,
        img: null,
        registerDate: null,
        lastUpdate: null,
        genderId: this.formRegister.get('gender').value,
        titleId: parseInt(titleCode.id),
      };
      this.manageUserService.createUser(dataUser).subscribe(
        res => {
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
    this.router.navigateByUrl(this.urlback);
  }

  onReject() {
    if (this.registerSuccess) {
      this.router.navigateByUrl(this.urlback);
    }
    this.messageService.clear('systemMessage');
    this.showCancelMessage = false;
  }

  showCancel() {
    this.showMessage('cancel');
  }


  profileSelect(e) {
    console.log(e.files);
  }

  subscribeInputMessageWaring() {
    this.formRegister
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.waringMessage());
    this.waringMessage();
  }

  waringMessage() {
    if (!this.formRegister) {
      return;
    }
    this.detailWarning = '';
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formRegister.get(field);
      if (field === 'repassword' && control.value !== '' && control.value !== this.formRegister.get('password').value) {
        this.detailWarning += 'กรุณากรอก รหัสผ่านให้ตรงกัน' + '\n';
        this.formRegister.controls[field].setValue('');
        this.formError[field] = this.validationMessage[field].required;
      } else if (control && !control.valid) {
        this.detailWarning += this.validationMessage[field].datail + '\n';
        this.formError[field] = this.validationMessage[field].required;
      }
    }

  }
}
