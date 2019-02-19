import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TitleName } from '../../interfaces/title-name';
import { TitleNameService } from '../../service/title-name.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Input() title;
  public yearRange: string;
  public displayYear: String;
  public th: any;
  public titleName: TitleName[];
  public form: FormGroup;
  public formType: String;
  public typeMessage: string

  

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

  public validationMassages = {
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
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.titleName = this.titleNameService.getTitleName();
    this.createForm();
    this.setCalendarTH();
    this.createYearRange();
    this.setTypeForm();
  }

  setTypeForm(){
    const {formType} = this.route.snapshot.data
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

  onValueChange() {
    if (!this.form) return;
    for (const field in this.formError) {
      this.formError[field] = '';
      const control = this.form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key in control.errors) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.form.valid) {
      this.messageService.clear();
      this.typeMessage = "success";
      this.messageService.add({ key: 'warning', sticky: true, severity: 'success', summary: 'สำเร็จ', detail: 'สมัครสมาชิกสำเร็จ' });
    } else {
      this.subscribeInputMessageWaring();
      this.typeMessage = "fail";
      this.messageService.clear();
      this.messageService.add({ key: 'warning', sticky: true, severity: 'warn', summary: 'ผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }
    setTimeout(() => {
      this.onReject();
    }, 3000);
  }

  onReject() {
    this.messageService.clear('warning');
  }

  createYearRange() {
    const currentYear = formatDate(new Date(), 'yyyy', 'en');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
  }

  subscribeInputMessageWaring(){
    this.form
    .valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(() => this.onValueChange())
  this.onValueChange();
  }

}
