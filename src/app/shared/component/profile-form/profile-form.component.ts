import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TitleName } from '../../interfaces/title-name';
import { TitleNameService } from '../../service/title-name.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileFormService } from '../../service/profile-form.service';




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
  public yearRange: string;
  public displayYear: String;
  public th: any;
  public titleName: TitleName[];
  public form: FormGroup;
  public formType: String;
  public disabled:boolean
  public buttonVisible:boolean
  public formRegisterDisplay:boolean;

  

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
    private profileService: ProfileFormService
  ) { }

  ngOnInit() {
    this.titleName = this.titleNameService.getTitleName();
    this.setTypeForm();
    this.createForm();
    this.setCalendarTH();
    this.createYearRange();
    this.setButtonVisible();
    this.setFormRegister();
  }

  setFormRegister(){
    this.formRegisterDisplay = this.profileService.getSettingRegisterForm();
  }

  setButtonVisible(){
    this.buttonVisible = this.profileService.getSettingButton();
  }

  setTypeForm(){
    const {formType} = this.route.snapshot.data
    this.profileService.setFormType(formType);
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
      dateFormat: 'dd/mm/yy'
    };
  }

  createForm() {
    this.form = this.formBuilder.group({
      titleName: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      phoneEmergency: ['', Validators.required]
    });


  }



  onSubmit(e) {
    e.preventDefault()
    this.dataForm.emit(this.form);
    this.dataFormError.emit(this.formError);
    this.dataValidationMessage.emit(this.validationMessage);

  }

  createYearRange() {
    const currentYear = formatDate(new Date(), 'yyyy', 'en');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
  }



}
