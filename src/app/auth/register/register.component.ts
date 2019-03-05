import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public title: String;
  public form:FormGroup;
  public typeMessage: string;
  public formError:any;
  public validationMessage:any;

  constructor(
    private messageService: MessageService,
    private manageUser:ManageUserService
  ) { }

  ngOnInit() {
    this.title = "Register";
  }

  onSubmit(data){
    this.form = data.form;
    this.setFormError(data.formError);
    this.setValidationMessage(data.validationMessage);

    if (this.form.valid) {
      this.messageService.clear();
      this.typeMessage = "success";
      this.messageService.add({ key: 'warning', sticky: true, severity: 'success', summary: 'สำเร็จ', detail: 'สมัครสมาชิกสำเร็จ' });
      const titleCode = this.form.get('titleName').value;
      const dataUser = {
        memberUsername:this.form.get('username').value,
        memberPassword:this.form.get('password').value,
        memberFname:this.form.get('fname').value,
        memberLname:this.form.get('lname').value,
        memberBirthdate:this.form.get('birthday').value,
        memberAddress:this.form.get('address').value,
        memberTel:this.form.get('phone').value,
        memberEmergencyTel:this.form.get('phoneEmergency').value,
        memberEmail:this.form.get('email').value,
        memberImg:null,
        memberRegisterDate:null,
        memberLastUpdate:null,
        memberGenderId:this.form.get('gender').value,
        memberRoleId:1,
        memberTitleId: parseInt(titleCode.titleNameCode),
      }
      this.manageUser.createUser(dataUser);
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

  setFormError(formError){
    this.formError = formError;
  }
  setValidationMessage(validationMessage){
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

    if(this.form.get('password').value !==this.form.get('repassword').value){
      this.formError['repassword'] = 'กรุณากรอก password ให้ตรงกัน';
    }
  }
}
