import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Validators, FormBuilder, FormGroup, RequiredValidator } from '@angular/forms';
import { MessageService, MenuItem, ConfirmationService, Message } from 'primeng/api';
import { TitleNameService } from 'src/app/shared/service/title-name.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { BreadcrumbService } from '../../shared/service/breadcrumb.service';
import localeTh from '@angular/common/locales/th.js';
import { ManageRoleService } from 'src/app/shared/service/manage-role.service';
import { Role } from 'src/app/shared/interfaces/role';
import { AuthService } from '../../shared/service/auth.service';
import { SelectItem } from 'primeng/api';
interface Bloodtype {
  memberBlood: String;
}

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
  public personalId: string;
  public previewImg: any;
  public onEdit: boolean;
  public pipe = new DatePipe('th-TH');
  public showRole: boolean;
  public roles: Role[];
  public msgs: Message[] = [];
  public urlback: string;
  public messageback: string;
  Bloodtype: SelectItem[];
  currentId = 0;
  profile: any;
  profileString: string;

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
    role: '',
    memberBlood: '',
    memberAllergyFood: '',
    memberAllergyMedicine: '',
    memberDisease: '',
    memberEmerName: '',
    memberEmerRelation: '',
    memberOther: '',
    EmerFName: '',
    EmerLName: ''
  };

  public validationMessage = {
    titleName: {
      detail: 'กรุณากรอก คำนำหน้า',
      required: 'คำนำหน้า*'
    },
    fname: {
      detail: 'กรุณากรอก ชื่อ',
      required: 'ชื่อ*'
    },
    lname: {
      detail: 'กรุณากรอก นามสกุล',
      required: 'นามสกุล*'
    },
    memberJob: {
      detail: 'กรุณากรอก อาชีพ',
      required: 'อาชีพ*'
    },
    gender: {
      detail: 'กรุณากรอก เพศ',
      required: 'เพศ*'
    },
    address: {
      detail: 'กรุณากรอก ที่อยู่',
      required: 'ที่อยู่*'
    },
    phone: {
      detail: 'กรุณากรอก เบอร์โทร',
      required: 'เบอร์โทร*'
    },
    email: {
      detail: 'กรุณากรอก E-mail',
      required: 'E-mail*'
    },
    phoneEmergency: {
      detail: 'กรุณากรอก เบอร์ติดต่อฉุกเฉิน',
      required: 'เบอร์ติดต่อฉุกเฉิน*'
    },
    role: {
      detail: 'กรุณากรอก สิทธิการใช้งาน',
      required: 'สิทธิการใช้งาน*'
    },
    memberBlood: {
      detail: 'กรุณากรอก กรุ๊ปเลือด',
      required: 'กรุ๊ปเลือด*'
    },
    // memberAllergyFood: {
    //   detail: 'กรุณากรอก อาหารที่แพ้',
    //   required: 'อาหารที่แพ้*'
    // },
    // memberAllergyMedicine: {
    //   detail: 'กรุณากรอก ยาที่แพ้',
    //   required: 'ยาที่แพ้*'
    // },
    // memberDisease: {
    //   detail: 'กรุณากรอก โรคประจำตัว',
    //   required: 'โรคประจำตัว*'
    // },
    // memberEmerName: {
    //   detail: 'กรุณากรอก ชื่อผู้ติดต่อฉุกเฉิน',
    //   required: 'ชื่อผู้ติดต่อฉุกเฉิน*'
    // },
    memberEmerRelation: {
      detail: 'กรุณากรอก ความสัมพันธ์ของผู้ติดต่อฉุกเฉิน',
      required: 'ความสัมพันธ์ของผู้ติดต่อฉุกเฉิน*'
    },
    // memberOther: {
    //   detail: 'กรุณากรอก หมายเหตุ',
    //   required: 'หมายเหตุ'
    // },
    EmerFName: {
      detail: 'กรุณากรอก ชื่อผู้ติดต่อฉุกเฉิน',
      required: 'ชื่อผู้ติดต่อฉุกเฉิน'
    },
    EmerLName: {
      detail: 'กรุณากรอก นามสกุลผู้ติดต่อฉุกเฉิน',
      required: 'นามสกุลผู้ติดต่อฉุกเฉิน'
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
    private confirmationService: ConfirmationService,
    private roleService: ManageRoleService,
    private authService: AuthService
  ) {
    this.Bloodtype = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'O', value: 'O' },
      { label: 'AB', value: 'AB' }
    ];
  }

  ngOnInit() {
    this.showRole = this.roleService.getRoleStatus();
    this.roles = this.roleService.getRoles();
    this.personalId = this.route.snapshot.paramMap.get('id');
    this.setBack();
    this.registerSuccess = false;
    this.showCancelMessage = false;
    this.onEdit = false;

    this.createForm();
    this.settingForm();
    this.settingCalendarTH();
    this.titleService.getTitleNames().subscribe(
      res => {
        this.titleName = res;
      },
      err => {
        console.log(err['error']['message']);

      }
    );

    if (this.authService.getRole().value === 'admin') {
      this.breadCrumbService.setPath([
        { label: 'จัดการสมาชิกทั้งหมด', routerLink: '/users' },
        { label: 'แก้ไขข้อมูลส่วนตัว' },
      ]);
    } else {
      this.breadCrumbService.setPath([
        { label: 'ข้อมูลส่วนตัว', routerLink: ['/profile', localStorage.getItem('userId')] },
        { label: 'แก้ไขข้อมูลส่วนตัว' },
      ]);
    }

  }

  setBack() {
    const route = this.authService.getRole().value === 'admin' ? '' : this.personalId;
    this.urlback = this.route.snapshot.data.urlback + route;
    this.messageback = this.route.snapshot.data.messageback;
  }

  createForm() {
    this.formEdit = this.formBuilder.group(
      {
        titleName: ['', Validators.required],
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        memberJob: ['', Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneEmergency: ['', Validators.required],
        imgProfile: [''],
        role: ['', Validators.required],
        memberBlood: ['', Validators.required],
        memberAllergyFood: [''],
        memberAllergyMedicine: [''],
        memberDisease: [''],
        // memberEmerName: ['', Validators.required],
        EmerFName: ['', Validators.required],
        EmerLName: ['', Validators.required],
        memberEmerRelation: ['', Validators.required],
        memberOther: ['']

      }
    );
  }

  settingForm() {
    this.manageUserService.getUser(this.personalId)
      .subscribe(res => {
        console.log(res);

        const titlename = {
          id: res['data']['titleId'],
          display: res['data']['titleDisplay'],
          name: res['data']['titleName']
        };
        const role = {
          roleId: res['data']['roleId'],
          roleName: res['data']['roleName'],
        };
        const memberEmerName = res['data']['memberEmerName'];

        this.formEdit.controls['titleName'].patchValue(titlename);
        this.formEdit.controls['role'].patchValue(role);
        this.formEdit.controls['fname'].setValue(res['data']['fname']);
        this.formEdit.controls['lname'].setValue(res['data']['lname']);
        this.formEdit.controls['memberJob'].setValue(res['data']['memberJob']);
        this.formEdit.controls['gender'].setValue(res['data']['genderId']);
        this.formEdit.controls['phone'].setValue(res['data']['tel']);
        this.formEdit.controls['email'].setValue(res['data']['email']);
        this.formEdit.controls['address'].setValue(res['data']['address']);
        this.formEdit.controls['phoneEmergency'].setValue(res['data']['emergencyTel']);
        this.formEdit.controls['memberBlood'].setValue(res['data']['memberBlood']);
        this.formEdit.controls['imgProfile'].setValue(res['data']['img']);
        this.formEdit.controls['memberAllergyFood'].setValue(res['data']['memberAllergyFood']);
        this.formEdit.controls['memberAllergyMedicine'].setValue(res['data']['memberAllergyMedicine']);
        this.formEdit.controls['memberDisease'].setValue(res['data']['memberDisease']);
        if (memberEmerName !== null) {
          const memberName = memberEmerName.split(' ', 2);
          const EmerFName = memberName[0];
          const EmerLName = memberName[1];
          this.formEdit.controls['EmerFName'].setValue(EmerFName);
          this.formEdit.controls['EmerLName'].setValue(EmerLName);
        }
        this.formEdit.controls['memberEmerRelation'].setValue(res['data']['memberEmerRelation']);
        this.formEdit.controls['memberOther'].setValue(res['data']['memberOther']);
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

    // const currentYear = new Date().toLocaleString('en-Us',{timeZone:'Asia/Bangkok'})
    // const aestTime = new Date(currentYear)
    // const currentYear = parseInt(formatDate(Date.now(),'yyyy','th'))
    const currentYear = this.pipe.transform(Date.now(), 'yyyy');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;

  }

  onSubmit(e) {
    console.log('onsubmit');
    if (!this.formEdit.valid) {
      this.subscribeInputMessageWaring();
      this.showMessageWrongValidate();
    } else {
      this.submitMessage(e);
    }
  }

  showMessageWrongValidate() {
    this.showToast('systemMessage', this.detailWarning);
  }

  submitMessage(e) {
    const message = 'ยืนยันการแก้ไขข้อมูลส่วนตัว ?';
    const type = 'submit';
    this.showDialog(message, type);
  }
  onEditprofile() {
    this.registerSuccess = true;
    this.router.navigateByUrl(this.urlback + this.personalId);
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

  showCancelConfirm() {
    let message;
    if (this.authService.getRole().value === 'admin') {
      message = 'ยกเลิกการแก้ไขข้อมูลส่วนตัว และกลับสู่หน้า?';
    } else {
      message = 'ยกเลิกการแก้ไขข้อมูลส่วนตัว และกลับสู่หน้า Profile ?';
    }

    const type = 'cancle';
    this.showDialog(message, type);

  }
  // อัปโหลดรูปภาพ
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
  // เปลี่ยนรูปภาพ
  handleInputChange(files) {
    const file = files;
    // format รูป เป็นไฟล์อื่นจะผิด
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
  // เปลี่ยนรูปจาก image เป็น base64 แล้ว post ลงฐานข้อมูล ในรูปแบบ String เป็น Type Blob
  _handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    // this.imageSrc = base64result;
    const id = this.currentId;
    if (id === 1) {
      this.profileString = base64result;
      this.formEdit.controls['imgProfile'].setValue(this.profileString);
      console.log(this.profileString);
    }
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
      if (control && !control.valid) {
        this.detailWarning += this.validationMessage[field].detail + '\n';
        this.formError[field] = this.validationMessage[field].required;
      }
    }
  }

  showClearConfirm() {
    const message = 'ล้างค่าการแก้ไขทั้งหมด';
    const type = 'clear';
    this.showDialog(message, type);
    // this.formEdit.reset();
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
      case 'clear': {
        this.settingForm();
        break;
      }
      case 'cancle': {
        if (this.authService.getRole().value === 'admin') {
          this.router.navigateByUrl(`/users`);
        } else {
          this.router.navigateByUrl(`/profile/${this.personalId}`);
        }

        break;
      }
      case 'submit': {
        const titleCode = this.formEdit.get('titleName').value;
        const role = this.formEdit.get('role').value;
        const EmerFName = this.formEdit.get('EmerFName').value;
        const EmerLName = this.formEdit.get('EmerLName').value;
        const memberEmer = EmerFName + ' ' + EmerLName;
        const dataUser = {
          fname: this.formEdit.get('fname').value,
          lname: this.formEdit.get('lname').value,
          memberJob: this.formEdit.get('memberJob').value,
          address: this.formEdit.get('address').value,
          tel: this.formEdit.get('phone').value,
          emergencyTel: this.formEdit.get('phoneEmergency').value,
          email: this.formEdit.get('email').value,
          img: this.profileString,
          registerDate: null,
          lastUpdate: null,
          genderId: this.formEdit.get('gender').value,
          titleId: +(titleCode.id),
          roleId: +(role.roleId),
          memberBlood: this.formEdit.get('memberBlood').value,
          memberAllergyFood: this.formEdit.get('memberAllergyFood').value,
          memberAllergyMedicine: this.formEdit.get('memberAllergyMedicine').value,
          memberDisease: this.formEdit.get('memberDisease').value,
          memberEmerName: memberEmer,
          memberEmerRelation: this.formEdit.get('memberEmerRelation').value,
          memberOther: this.formEdit.get('memberOther').value,
        };

        this.manageUserService.updateUser(this.personalId, dataUser).subscribe(
          res => {
            if (res['status'] === 'Success') {
              this.showToast('alertMessage', 'แก้ไขข้อมูลสำเร็จ');
            } else {
              this.showToast('alertMessage', 'แก้ไขข้อมูลไม่สำเร็จ');
            }
          },
          err => {
            console.log(err);
          }
        );
        break;
      }
      default: { break; }
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
