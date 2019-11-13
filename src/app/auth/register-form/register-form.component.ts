import { TitleName } from './../../shared/interfaces/title-name';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TitleNameService } from 'src/app/shared/service/title-name.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { SelectItem } from 'primeng/api';
import { Member } from 'src/app/shared/interfaces/member';
interface Bloodtype {
  memberBlood: string;
}
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public formRegister: FormGroup;
  public menu: MenuItem[];
  public titleName: any[];
  public titlename: TitleName;
  public th: any;
  public yearRange: string;
  public detailWarning: string;
  public registerSuccess: boolean;
  public showCancelMessage: boolean;
  public urlback: string;
  public messageback: string;
  public imgProfile: any;
  public previewImg: any;
  public member: Member[];
  Bloodtype: SelectItem[];
  selectedBloodtype: string;
  uploadedFiles: any[] = [];
  currentId = 0;
  profile: any;
  profileString: string;
  finalJson = {};
  disableMen = false;

  public formError = {
    username: '',
    password: '',
    repassword: '',
    titleName: '',
    fname: '',
    lname: '',
    memberJob: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    phoneEmergency: '',
    memberBlood: '',
    memberEmerRelation: '',
    emerFName: '',
    emerLName: ''
  };

  public validationMessage = {
    username: {
      // detail: 'กรุณากรอก Username',
      required: 'ชื่อผู้ใช้*'
    },
    password: {
      // detail: 'กรุณากรอก Password',
      required: 'รหัสผ่าน*'
    },
    repassword: {
      // detail: 'กรุณากรอก Re-password',
      required: 'กรอกรหัสผ่านอีกครั้ง*'
    },
    titleName: {
      // detail: 'กรุณากรอก คำนำหน้า',
      required: 'คำนำหน้า*'
    },
    fname: {
      // detail: 'กรุณากรอก ชื่อ',
      required: 'ชื่อ*'
    },
    lname: {
      // detail: 'กรุณากรอก นามสกุล',
      required: 'นามสกุล*'
    },
    memberJob: {
      // detail: 'กรุณากรอก อาชีพ',
      required: 'อาชีพ*'
    },
    gender: {
      // detail: 'กรุณากรอก เพศ',
      required: 'เพศ*'
    },
    address: {
      // detail: 'กรุณากรอก ที่อยู่',
      required: 'ที่อยู่*'
    },
    phone: {
      // detail: 'กรุณากรอก เบอร์โทร',
      required: 'เบอร์โทร*'
    },
    email: {
      // detail: 'กรุณากรอก E-mail',
      required: 'E-mail*',
      // email: 'รูปแบบไม่ถูกต้อง'
    },
    phoneEmergency: {
      // detail: 'กรุณากรอก เบอร์ติดต่อฉุกเฉิน',
      required: 'เบอร์ติดต่อฉุกเฉิน*'
    },
    memberBlood: {
      // detail: 'กรุณากรอก กรุ๊ปเลือด',
      required: 'กรุ๊ปเลือด*'
    },
    memberEmerRelation: {
      // detail: 'กรุณากรอก ความสัมพันธ์ของผู้ติดต่อฉุกเฉิน',
      required: 'ความสัมพันธ์*'
    },
    emerFName: {
      // detail: 'กรุณากรอก หมายเหตุ',
      required: 'ชื่อ*'
    },
    emerLName: {
      // detail: 'กรุณากรอก หมายเหตุ',
      required: 'นามสกุล*'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private titleService: TitleNameService,
    private router: Router,
    private manageUserService: ManageUserService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
  ) {
    this.Bloodtype = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'O', value: 'O' },
      { label: 'AB', value: 'AB' }
    ];

  }

  ngOnInit() {
    this.breadCrumbService.setPath([
      { label: 'จัดการสมาชิกทั้งหมด', routerLink: '/users' },
      { label: 'ลงทะเบียนสมาชิก', routerLink: '/users/create' },
    ]);

    this.urlback = this.route.snapshot.data.urlback;
    this.registerSuccess = false;
    this.showCancelMessage = false;
    this.setBack();
    this.createForm();
    this.settingCalendarTH();
    this.checkGender();
    this.titleService.getTitleNames().subscribe(
      res => {
        this.titleName = [
          ...res
        ];
        console.log(res);

      },
      err => {
        console.log(err['error']['message']);
      }

    );

    this.menu = [
      { label: 'Login', url: 'auth/login' },
      { label: 'Register : สมัครสมาชิก' },
    ];
  }


  setBack() {
    this.urlback = this.route.snapshot.data.urlback;
    this.messageback = this.route.snapshot.data.messageback;
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
        memberJob: ['', Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        phoneEmergency: ['', Validators.required],
        memberBlood: ['', Validators.required],
        memberAllergyFood: [''],
        memberAllergyMedicine: [''],
        // other: ['', Validators.required],
        memberDisease: [''],
        emerLName: ['', Validators.required],
        emerFName: ['', Validators.required],
        memberEmerRelation: ['', Validators.required],
        memberOther: ['']
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

  onSubmit(e) {
    if (!this.formRegister.valid || this.formRegister.get('repassword').value !== this.formRegister.get('password').value) {
      this.subscribeInputMessageWaring();
      this.showMessage();
    } else {
      this.submitMessage(e);
    }
    console.log('test');
  }

  submitMessage(e) {
    const message = 'ยืนยันการสมัครสมาชิก';
    const type = 'submit';
    this.showDialog(message, type);
  }


  showDialog(message, type) {
    this.confirmationService.confirm({
      message: message,
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.actionAccept(type);
      },
      reject: () => {
      }
    });
  }

  actionAccept(type) {
    switch (type) {
      case 'cancle': {
        this.router.navigateByUrl(this.urlback);
        break;
      }
      case 'submit': {
        console.log('submit');
        const titleCode = this.formRegister.get('titleName').value;
        const emerFName = this.formRegister.get('emerFName').value;
        const emerLName = this.formRegister.get('emerLName').value;
        const memberEmerName = emerFName + ' ' + emerLName;
        const dataUser = {
          username: this.formRegister.get('username').value,
          password: this.formRegister.get('password').value,
          fname: this.formRegister.get('fname').value,
          lname: this.formRegister.get('lname').value,
          memberJob: this.formRegister.get('memberJob').value,
          memberBlood: this.formRegister.get('memberBlood').value,
          // other: this.formRegister.get('other').value,
          memberAllergyFood: this.formRegister.get('memberAllergyFood').value,
          memberAllergyMedicine: this.formRegister.get('memberAllergyMedicine').value,
          memberDisease: this.formRegister.get('memberDisease').value,
          memberEmerName: memberEmerName,
          memberEmerRelation: this.formRegister.get('memberEmerRelation').value,
          memberOther: this.formRegister.get('memberOther').value,
          address: this.formRegister.get('address').value,
          tel: this.formRegister.get('phone').value,
          emergencyTel: this.formRegister.get('phoneEmergency').value,
          email: this.formRegister.get('email').value,
          img: this.profileString,
          registerDate: null,
          lastUpdate: null,
          genderId: this.formRegister.get('gender').value,
          // tslint:disable-next-line:radix
          titleId: parseInt(titleCode.id),
        };

        this.manageUserService.createUser(dataUser).subscribe(
          res => {
            if (res['status'] === 'Success') {
              this.showToast('alertMessage', 'สมัครสมาชิกสำเร็จ');
            } else {
              this.showToast('alertMessage', 'สมัครสมาชิกไม่สำเร็จ');
            }
          },
          err => {
            this.showToast('alertMessage', err.error['errorMessage']);
            console.log('submit error');
            console.log(err);
          }
        );

        break;
      }
      default: { break; }
    }
  }
  CheckColors(val) {
    const element = document.getElementById('color');
    if (val === 'pick a color' || val === 'others') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }

  checkGender() {

  }
  showMessage() {
    this.showToast('systemMessage', this.detailWarning);
  }

  onReject() {
    if (this.registerSuccess) {
      this.router.navigateByUrl(this.urlback);
    }
    this.messageService.clear('systemMessage');
    this.showCancelMessage = false;
  }

  showCancel() {
    // this.showMessage('cancel');
    const message = 'ยกเลิกการสมัคร ?';
    const type = 'cancle';
    this.showDialog(message, type);
  }

  profileSelect(event, field) {
    this.currentId = field;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (file.size < 1000000) {
        this.profile = file;
        this.handleInputChange(this.profile); // turn into base64
      } else {
        alert('ไฟล์เกินขนาด!');
      }
    } else {
      alert('ไฟล์ผิดประเภท!');
    }
  }

  handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('ไฟล์ผิดประเภท!');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.onload = () => {
      this.previewImg = reader.result;
    };
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    // this.imageSrc = base64result;
    const id = this.currentId;
    if (id === 1) {
      this.profileString = base64result;
      console.log(this.profileString);
    }
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
        // this.formRegister.controls[field].setValue('');
        // this.formError[field] = this.validationMessage[field].required;

      } else if (control && !control.valid) {
        this.detailWarning = 'กรุณากรอกข้อมูลให้ครบถ้วน' + '\n';
        // this.detailWarning += this.validationMessage[field].detail + '\n';
        this.formError[field] = this.validationMessage[field].required;
      }
    }

  }

  showToast(key, detail) {
    this.messageService.clear();
    this.messageService.add(
      {
        key: key,
        sticky: true,
        summary: 'ข้อความจากระบบ',
        detail: detail
      }
    );
  }


}
