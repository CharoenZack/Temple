import { Component, OnInit, Input, Output, EventEmitter, HostBinding, Directive } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TitleName } from '../../interfaces/title-name';
import { TitleNameService } from '../../service/title-name.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileFormService } from '../../service/profile-form.service';
import { PersonalInfoService } from '../../service/personal-info.service';




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
  public personalId : string;
  public yearRange: string;
  public displayYear: String;
  public th: any;
  public titleName: TitleName[];
  public form: FormGroup;
  public formType = ''; 
  public readonly: boolean
  public disabled: boolean
  public buttonVisible: boolean
  public formRegisterDisplay: boolean;
  public titleNamePerson: TitleName;

  public formConponent = {
    titleName: ['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    phoneEmergency: ['', Validators.required]
  }



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
  }

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
  }

  constructor(
    private titleNameService: TitleNameService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileFormService,
    private personnalInfoService: PersonalInfoService
  ) { }

  ngOnInit() {
    this.titleName = this.titleNameService.getTitleNames();
    this.setTypeForm();
    this.setCalendarTH();
    this.createYearRange();
    this.setButtonVisible();
    this.setFormRegisterDisplay();
    // for Register form
    if (this.formType == 'Register') {
      this.setFormError();
      this.setValidationMessage();
      this.createFormRegister();
    } else {
      this.createForm();
    }
    // for Profile form
    if (this.formType == 'Profile' || this.formType == 'Edit' || this.formType == 'EditAdmin' ) {
      this.personalId = this.route.snapshot.paramMap.get('id');
      const personalData = this.personnalInfoService.getPersonalInfo(this.personalId );
      // set titlename in form
      this.titleNamePerson = this.titleNameService.getTitleName(+personalData.titleName);
      this.form.controls['fname'].setValue(personalData.fname);
      this.form.controls['lname'].setValue(personalData.lname);
      this.form.controls['birthday'].setValue(new Date(personalData.birthday));
      this.form.controls['gender'].setValue(personalData.gender);
      this.form.controls['phone'].setValue(personalData.phone);
      this.form.controls['email'].setValue(personalData.email);
      this.form.controls['address'].setValue(personalData.address);
      this.form.controls['phoneEmergency'].setValue(personalData.phoneEmergency);
    }

  }

  profileSelect(e){
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
    }

    this.validationMessage = {
      ...validationMessage,
      ...this.validationMessage
    }
  }

  setFormError() {
    const formError = {
      username: '',
      password: '',
      repassword: ''
    }
    this.formError = {
      ...formError,
      ...this.formError
    }
  }

  setFormRegisterDisplay() {
    this.formRegisterDisplay = this.profileService.getSettingRegisterForm();
  }

  setButtonVisible() {
    this.buttonVisible = this.profileService.getSettingButton();
  }

  setTypeForm() {
    const { formType } = this.route.snapshot.data
    this.formType = formType;
    this.profileService.setFormType(formType);
    this.readonly = this.profileService.getSettingReadOnly();
    this.disabled = this.profileService.getSettingDisabled();
  }

  setCalendarTH() {
    this.th = {
      firstDayOfWeek: 0,
      dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
      monthNames: ["มกราคม ", "กุมภาพันธ์ ", "มีนาคม ", "เมษายน ",
        "พฤษภาคม  ", "มิถุนายน ", "กรกฎาคม ", "สิงหาคม ",
        "กันยายน ", "ตุลาคม ", "พฤศจิกายน ", "ธันวาคม "],
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
      username: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    }
    this.form = this.formBuilder.group({
      ...formRegister,
      ...this.formConponent
    });
  }



  onSubmit(e) {
    e.preventDefault()
    const data = {
      form: this.form,
      formError: this.formError,
      validationMessage: this.validationMessage
    }
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
  }
  setRepassword(repassword) {
    this.form.controls['repassword'].setValue(repassword);
  }

  onCancle(data){
    console.log(data);
  }


}
