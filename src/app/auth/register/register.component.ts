import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    private router:Router,
    private messageService: MessageService,
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
      setTimeout(() => {
        this.router.navigateByUrl('/auth/login');
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
  }
}
