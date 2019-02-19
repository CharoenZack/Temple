import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  template: `
  <div class="ui-g-6">
    <button pButton type="submit" label="ยืนยัน" class="ui-button-raised"></button>
  </div>
  <div class="ui-g-6">
    <button pButton type="button" label="ยกเลิก" class="ui-button-raised ui-button-danger"></button>
  </div>
  `
})
export class ConfirmButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
