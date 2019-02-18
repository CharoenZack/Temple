import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
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
    const username = this.form.get('username').value
    if(this.form.valid){
      this.data.emit({email,username})
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "username":['',Validators.required],
    })
  }
}

