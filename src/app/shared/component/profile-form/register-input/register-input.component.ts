import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-input',
  template:`
  <div class="ui-inputgroup">
  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-3 ui-sm-offset-0">
    Username*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-9">
    <div><input type="text" pInputText placeholder="Username" ></div>
  </div>
</div>
<div class="ui-inputgroup">
  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-3 ui-sm-offset-0">
    Password*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-9">
    <div><input type="text" pInputText placeholder="Password" ></div>
  </div>
</div>
<div class="ui-inputgroup">
  <div class="ui-g-3 ui-g-offset-2 ui-lg-3 ui-lg-offset-2 ui-md-3 ui-md-offset-1 ui-sm-3 ui-sm-offset-0">
    Re-Password*
  </div>
  <div class="ui-g-7 ui-lg-7 ui-md-8 ui-sm-9">
    <div><input type="text" pInputText placeholder="Re-Password" ></div>
  </div>
</div>
  `

})
export class RegisterInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
