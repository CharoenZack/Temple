import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Mockupdata } from 'src/app/shared/interfaces/mockupdata';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  logined: Mockupdata;

  @Input() formTitle:string
  @Output() data =new EventEmitter<Object>()
  constructor(
    private formBuilder: FormBuilder,
    private authService :AuthService
  ) { }

  ngOnInit() {
    this.createForm()
  }

  onSubmit(e){
    e.preventDefault()
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    console.log(email,password);
    
    if(this.form.valid){
      this.authService.login(email,password)
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "password":['',Validators.required],
    })
  }
  

}
