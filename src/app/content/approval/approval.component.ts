import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ApprovalService } from './approval.service';


@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  public menu: MenuItem[];
  
  constructor(
    public approvalService: ApprovalService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.menu = [
      { label: '',icon:"pi pi-home",routerLink:'/'},
      { label: 'Approval user : อนุมัติพิเศษ' },
    ];
  }

}
