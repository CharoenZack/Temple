import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService, MenuItem, ConfirmationService, Message } from 'primeng/api';
import { TitleNameService } from 'src/app/shared/service/title-name.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { BreadcrumbService } from '../../shared/service/breadcrumb.service';
import localeTh from '@angular/common/locales/th.js';
import { ManageRoleService } from 'src/app/shared/service/manage-role.service';
import { Role } from 'src/app/shared/interfaces/role';
import {AuthService} from '../../shared/service/auth.service';


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
  public pipe = new DatePipe('th-TH')
  public showRole:boolean;
  public roles:Role[]
  public msgs: Message[] = [];
  public urlback: string;
  public messageback:string;


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
    phoneEmergency: '',
    role:''
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
    },
    role: {
      datail: 'กรุณากรอก สิทธิการใช้งาน',
      required: 'สิทธิการใช้งาน*'
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
    private roleService:ManageRoleService,
    private authService:AuthService
  ) {
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
        this.titleName = res
      },
      err => {
        console.log(err['error']['message']);

      }
    );
    
    if(this.authService.getRole().value==="admin"){
      this.breadCrumbService.setPath([
        {label: 'Members management : จัดการสมาชิกทั้งหมด', routerLink: '/users'},
        { label: 'Edit Profile : แก้ไขข้อมูลส่วนตัว' },
      ]);
    }else{
      this.breadCrumbService.setPath([
        { label: 'Profile : ข้อมูลส่วนตัว', routerLink: ['/profile', localStorage.getItem('userId')] },
        { label: 'Edit Profile : แก้ไขข้อมูลส่วนตัว' },
      ]);
    }

  }

  setBack(){
    const route = this.authService.getRole().value==="admin"?'':this.personalId;
    this.urlback = this.route.snapshot.data.urlback+route;
    this.messageback = this.route.snapshot.data.messageback;
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
        phoneEmergency: ['', Validators.required],
        imgProfile: [''],
        role:['', Validators.required]
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
        const role = {
          roleId:res['data']['roleId'],
          roleName:res['data']['roleName'],
        };
        this.formEdit.controls['titleName'].patchValue(titlename);
        this.formEdit.controls['role'].patchValue(role); 
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

    // const currentYear = new Date().toLocaleString('en-Us',{timeZone:'Asia/Bangkok'})
    // const aestTime = new Date(currentYear)
    //const currentYear = parseInt(formatDate(Date.now(),'yyyy','th'))
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
    this.showToast("systemMessage",this.detailWarning);
  }


  submitMessage(e) {
    const message = "ยืนยันการแก้ไขข้อมูลส่วนตัว ?";
    const type = "submit"
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
    const message = "ยกเลิกการแก้ไขข้อมูลส่วนตัว และกลับสู่หน้า Profile ?";
    const type = "cancle";
    this.showDialog(message, type);

  }


  profileSelect(e) {
    const file = e.target.files;
    console.log(file);

    if (file.length === 0) {
      return;
    }

    const mimeType = file[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    this.formEdit.controls['imgProfile'].setValue(file[0]);
    reader.onload = () => {
      this.previewImg = reader.result;
    };

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
        this.detailWarning += this.validationMessage[field].datail + '\n';
        this.formError[field] = this.validationMessage[field].required;
      }
    }
  }

  showClearConfirm() {
    const message = "ล้างค่าการแก้ไขทั้งหมด";
    const type = "clear"
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
      case "clear": {
        this.settingForm();
        break;
      }
      case "cancle": {
        this.router.navigateByUrl(`/profile/${this.personalId}`);
        break;
      }
      case "submit": {
        const titleCode = this.formEdit.get('titleName').value;
        const role = this.formEdit.get('role').value;
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
          titleId: +(titleCode.id),
          roleId:+(role.roleId)
        };

        this.manageUserService.updateUser(this.personalId, dataUser).subscribe(
          res => {
            if (res['status'] === 'Success') {
              this.showToast("alertMessage", "แก้ไขข้อมูลสำเร็จ");
            } else {
              this.showToast("alertMessage", "แก้ไขข้อมูลไม่สำเร็จ");
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
