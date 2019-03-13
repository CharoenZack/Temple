import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent implements OnInit {
  public title: String;
  public form: FormGroup;
  public typeMessage: string;
  public formError: any;
  public validationMessage: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private manageUserService: ManageUserService
  ) { }

  ngOnInit() {
    this.title = "แก้ไขข้อมูลส่วนตัว";
  }

  onSubmit(data) {
    console.log('edit-personal');

    this.form = data.form;
    this.setFormError(data.formError);
    this.setValidationMessage(data.validationMessage);
    const id = this.route.snapshot.paramMap.get('id');
    if (this.form.valid) {
      const titleCode = this.form.get('titleName').value;
      const dataUser = {
        fname: this.form.get('fname').value,
        lname: this.form.get('lname').value,
        birthdate: this.form.get('birthday').value,
        address: this.form.get('address').value,
        tel: this.form.get('phone').value,
        emergencyTel: this.form.get('phoneEmergency').value,
        email: this.form.get('email').value,
        img: null,
        // registerDate:null,
        // lastUpdate:null,
        genderId: this.form.get('gender').value,
        roleId: 1,
        titleId: parseInt(titleCode.id)
      }
      this.manageUserService.updateUser(id, dataUser)
        .subscribe(res => {
          if (res['status'] === 'Success') {
            this.messageService.clear();
            this.typeMessage = "success";
            this.messageService.add({ key: 'warning', sticky: true, severity: 'success', summary: 'สำเร็จ', detail: 'แก้ไขข้อมูลส่วนตัวสำเร็จ' });
          }
        }
        );
      //this.messageService.clear();
      // this.typeMessage = "success";
      // this.messageService.add({ key: 'warning', sticky: true, severity: 'success', summary: 'สำเร็จ', detail: 'แก้ไขข้อมูลส่วนตัวสำเร็จ' });
      setTimeout(() => {
        //this.router.navigateByUrl(`/profile/${id}`);
      }, 4000);
    } else {
      this.subscribeInputMessageWaring();
      this.typeMessage = "fail";
      this.messageService.clear();
      this.messageService.add({ key: 'warning', sticky: true, severity: 'warn', summary: 'ผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      setTimeout(() => {
        this.onReject();
      }, 3000);
    }

  }

  onReject() {
    this.messageService.clear('warning');
  }


  subscribeInputMessageWaring() {
    this.form
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.onValueChange())
    this.onValueChange();
  }

  setFormError(formError) {
    this.formError = formError;
  }
  setValidationMessage(validationMessage) {
    this.validationMessage = validationMessage;
  }

  onValueChange() {
    if (!this.form) return;
    for (const field in this.formError) {
      this.formError[field] = '';
      const control = this.form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessage[field];
        for (const key in control.errors) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }
}