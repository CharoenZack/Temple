import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-input',
  template: `

  <fieldset>
  <legend>ข้อมูล</legend>


  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-12 ui-sm-offset-0">
    Username*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-12">
    <div><input type="text" minlength="4" pInputText placeholder="Username" [(ngModel)]="username" (blur)='bindUsername()'></div>
    <div *ngIf="formError.username" class="text-danger text-invalid">{{formError.username}}</div>
  </div>


  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-12 ui-sm-offset-0">
    Password*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-12">
    <div><input type="password" minlength="4"  pInputText placeholder="Password" [(ngModel)]="password" (blur)='bindPassword()' ></div>
    <div *ngIf="formError.password" class="text-danger text-invalid">{{formError.password}}</div>
  </div>

  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-12 ui-sm-offset-0">
    Re-Password*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-12">
    <div><input type="password" minlength="4" pInputText placeholder="Re-Password" [(ngModel)]="repassword" (blur)='bindRepassword()' ></div>
    <div *ngIf="formError.repassword" class="text-danger text-invalid">{{formError.repassword}}</div>
  </div>

</fieldset>
  `,
  styles: [`
      div.text-danger.text-invalid{
        color: rgb(255, 0, 0)
      }
      legend{
        margin: 2em;
        font-size: 1.15em;
        font-weight: bold;
        background-color: white;
      }

      fieldset {
        margin-block-end: 2em;
        border: 1px solid rgb(206, 206, 206);
        box-shadow: 0px 0px 10px rgba(192, 192, 192, 0.5);
        border-radius: 5px;
      }

`]

})
export class RegisterInputComponent implements OnInit {

  @Input() formError;
  @Output() usernameData = new EventEmitter<String>();
  @Output() passwordData = new EventEmitter<String>();
  @Output() repasswordData = new EventEmitter<String>();
  public username: string;
  public password: string;
  public repassword: string;


  constructor() { }

  ngOnInit() {
  }

  bindUsername() {
    this.usernameData.emit(this.username);
  }
  bindPassword() {
    this.passwordData.emit(this.password);
  }
  bindRepassword() {
    this.repasswordData.emit(this.repassword);
  }
}
