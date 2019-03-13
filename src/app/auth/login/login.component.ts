import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // this.spinner.show();
 
    // setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    // }, 5000);
    this.createForm();
  }

  onSubmit(e) {
    e.preventDefault()
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    console.log(username, password);

    if (this.form.valid) {
      this.authService.login(username, password);
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      "username": ['', Validators.required],
      "password": ['', Validators.required],
    });
  }


}
