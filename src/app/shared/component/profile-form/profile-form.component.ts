import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TitleName} from '../../interfaces/title-name';
import {TitleNameService} from '../../service/title-name.service';
import {formatDate} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ProfileFormService} from '../../service/profile-form.service';
import {ManageUserService} from '../../service/manage-user.service';


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Input() title;
  @Output() dataForm = new EventEmitter();
  @Output() dataFormError = new EventEmitter();
  @Output() dataValidationMessage = new EventEmitter();
  @Output() data = new EventEmitter();

  public uploadedFiles: any;
  public personalId: string;
  public yearRange: string;
  public displayYear: String;
  public th: any;
  public titleName: TitleName[];
  public form: FormGroup;
  public formType = '';
  public readonly: boolean;
  // public disabled: boolean
  public buttonVisible: boolean;
  public formRegisterDisplay: boolean;
  public titleNamePerson: TitleName;

  public formConponent = {
    // new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    titleName: [{value: '', optionLabel: '', disabled: false}, Validators.required],
    fname: [{value: '', disabled: false}, Validators.required],
    lname: [{value: '', disabled: false}, Validators.required],
    birthday: [{value: '', disabled: false}, Validators.required],
    gender: [{value: '', disabled: false}, Validators.required],
    address: [{value: '', disabled: false}, Validators.required],
    phone: [{value: '', disabled: false}, Validators.required],
    email: [{value: '', disabled: false}, Validators.required],
    phoneEmergency: [{value: '', disabled: false}, Validators.required]
  };


  public formError = {
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
      required: '*กรุณาเลือกคำนำหน้า'
    },
    fname: {
      required: '*กรุณากรอกชื่อจริง'
    },
    lname: {
      required: '*กรุณากรอกนามสกุล'
    },
    birthday: {
      required: '*กรุณากรอกวันเกิด'
    },
    gender: {
      required: '*กรุณาเลือกเพศ'
    },
    address: {
      required: '*กรุณากรอกที่อยู่'
    },
    phone: {
      required: '*กรุณากรอกเบอร์โทรศัพท์'
    },
    email: {
      required: '*กรุณากรอกอีเมล'
    },
    phoneEmergency: {
      required: '*กรุณากรอกเบอร์ติดต่อฉุกเฉิน'
    }
  };

  constructor(
    private titleNameService: TitleNameService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileFormService,
    private manageUserService: ManageUserService
  ) {
  }

  ngOnInit() {

    // edit
    this.titleNameService.getTitleNames().subscribe(res => {
        this.titleName = [
          {display: 'กรุณาเลือกคำนำหน้า'},
          ...res
        ];

        console.log(res, 'titlename');

      },
      (e) => console.log(e['error']['message'])
    );

    this.setTypeForm();
    this.setCalendarTH();
    this.createYearRange();
    this.setButtonVisible();
    this.setFormRegisterDisplay();

    if (this.formType === 'Register') {
      this.setFormError();
      this.setValidationMessage();
      this.createFormRegister();
    } else {
      this.createForm();
    }


    // for Profile form
    if (this.formType === 'Profile' || this.formType === 'Edit' || this.formType === 'EditAdmin') {
      this.personalId = this.route.snapshot.paramMap.get('id');
      this.manageUserService.getUser(this.personalId)
        .subscribe(res => {
            const titlename = {
              id: res['data']['titleId'],
              display: res['data']['titleDisplay'],
              name: res['data']['titleName']
            };
            this.form.controls['titleName'].patchValue(titlename);
            this.form.controls['fname'].setValue(res['data']['fname']);
            this.form.controls['lname'].setValue(res['data']['lname']);
            this.form.controls['birthday'].setValue(new Date(res['data']['birthdate']));
            this.form.controls['gender'].setValue(res['data']['genderId']);
            this.form.controls['phone'].setValue(res['data']['tel']);
            this.form.controls['email'].setValue(res['data']['email']);
            this.form.controls['address'].setValue(res['data']['address']);
            this.form.controls['phoneEmergency'].setValue(res['data']['emergencyTel']);
          },
          (e) => console.log(e['error']['message'])
        );
    }

    if (this.formType === 'Profile') {
      this.form.disable();
    }

  }

  profileSelect(e) {
    console.log(e.files);
  }

  setValidationMessage() {
    const validationMessage = {
      username: {
        required: '*กรุณากรอก Username'
      },
      password: {
        required: '*กรุณากรอก Password'
      },
      repassword: {
        required: '*กรุณากรอก Re-passoword'
      }
    };

    this.validationMessage = {
      ...validationMessage,
      ...this.validationMessage
    };
  }

  setFormError() {
    const formError = {
      username: '',
      password: '',
      repassword: ''
    };
    this.formError = {
      ...formError,
      ...this.formError
    };
  }

  setFormRegisterDisplay() {
    this.formRegisterDisplay = this.profileService.getSettingRegisterForm();
  }

  setButtonVisible() {
    this.buttonVisible = this.profileService.getSettingButton();
  }

  setTypeForm() {
    const {formType} = this.route.snapshot.data;
    this.formType = formType;
    this.profileService.setFormType(formType);
    this.readonly = this.profileService.getSettingReadOnly();
    // this.disabled = this.profileService.getSettingDisabled();
  }

  setCalendarTH() {
    this.th = {
      firstDayOfWeek: 0,
      dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
      monthNames: ['มกราคม ', 'กุมภาพันธ์ ', 'มีนาคม ', 'เมษายน ',
        'พฤษภาคม  ', 'มิถุนายน ', 'กรกฎาคม ', 'สิงหาคม ',
        'กันยายน ', 'ตุลาคม ', 'พฤศจิกายน ', 'ธันวาคม '],
      today: 'Today',
      clear: 'Clear',
      // dateFormat: 'dd/mm/yy'
    };
  }

  createForm() {
    this.form = this.formBuilder.group(this.formConponent);
  }

  createFormRegister() {
    const formRegister = {
      // username: ['', Validators.required,Validators.minLength(4)],
      // password: ['', Validators.required,Validators.minLength(4)],
      // repassword: ['', Validators.required,Validators.minLength(4)]
      username: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    };
    this.form = this.formBuilder.group({
      ...formRegister,
      ...this.formConponent
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const data = {
      form: this.form,
      formError: this.formError,
      validationMessage: this.validationMessage
    };
    this.data.emit(data);
  }

  createYearRange() {
    const currentYear = formatDate(new Date(), 'yyyy', 'en');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
  }

  setUsername(username) {
    this.form.controls['username'].setValue(username);
  }

  setPassword(password) {
    this.form.controls['password'].setValue(password);
    console.log(password);

  }

  setRepassword(repassword) {
    this.form.controls['repassword'].setValue(repassword);
    console.log(repassword);

  }

  onCancle(data) {
    console.log(data);
  }


}
