import { Component, OnInit, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-confirm-button',
  template: `
  <div class="ui-g-6">
    <button pButton type="submit" label="ยืนยัน" class="ui-button-raised"></button>
  </div>
  <div class="ui-g-6">
    <button pButton type="button" label="ยกเลิก" class="ui-button-raised ui-button-danger" (click)="onCancel()"></button>
  </div>
  `
})
export class ConfirmButtonComponent implements OnInit {
  @Input() formType:String;
  public personalId :String;
  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.personalId = this.route.snapshot.paramMap.get('id');
  }

  onCancel(){
    if(this.formType=='Edit'){
      this.router.navigateByUrl(`/profile/${this.personalId}`);
    }else if(this.formType=='Register'){
      this.router.navigateByUrl('/auth/login');
    }
  }

}
