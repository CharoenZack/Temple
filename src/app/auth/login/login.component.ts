import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  @Input() formTitle:string
  @Output() data =new EventEmitter<Object>()
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm()
  }

  onSubmit(e){
    e.preventDefault()
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    if(this.form.valid){
      this.data.emit({email,password})
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "password":['',Validators.required],
    })
  }
}
