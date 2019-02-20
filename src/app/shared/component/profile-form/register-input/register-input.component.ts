import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-input',
  template: `
  <div class="ui-inputgroup">
  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-3 ui-sm-offset-0">
    Username*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-9">
    <div><input type="text" pInputText placeholder="Username" [(ngModel)]="username" (blur)='bindUsername()'></div>
    <div *ngIf="formError.username" class="text-danger text-invalid">{{formError.username}}</div>
  </div>
</div>
<div class="ui-inputgroup">
  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-3 ui-sm-offset-0">
    Password*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-9">
    <div><input type="password" pInputText placeholder="Password" [(ngModel)]="password" (blur)='bindPassword()' ></div>
    <div *ngIf="formError.password" class="text-danger text-invalid">{{formError.password}}</div>
  </div>
</div>
<div class="ui-inputgroup">
  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-3 ui-sm-offset-0">
    Re-Password*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-9">
    <div><input type="password" pInputText placeholder="Re-Password" [(ngModel)]="repassword" (blur)='bindRepassword()' ></div>
    <div *ngIf="formError.repassword" class="text-danger text-invalid">{{formError.repassword}}</div>
  </div>
</div>
  `,
  styles: [`div.text-danger.text-invalid{
    color: rgb(255, 0, 0)
}`]

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
