import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService, ConfirmationService} from 'primeng/api';
import {ApprovalService} from './approval.service';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
    
    msgs: any[] = [];
    cols: any[];
    public menu: MenuItem[];

    constructor(
        private approvalService: ApprovalService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private breadCrumbService: BreadcrumbService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.cols = [
            {field: 'date', header: 'วันที่'},
            {field: 'name', header: 'ชื่อ-นามสกุล'},
            {field: 'courseName', header: 'ชื่อคอร์ส'},
            {field: 'conditionMin', header: 'หมายเหตุ'},
        ];
        

        this.breadCrumbService.setPath([
            {label: 'Approval: การอนุมัติ', routerLink: '/approval'},
        ]);
    }

    confirm1() {
        this.confirmationService.confirm({
            key:'approvalMessage',
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
            },
            reject: () => {
                this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
            }
        });
        
    }

    onReject() {
        this.messageService.clear('systemMessage');
        
      }
      onApprove() {
        this.router.navigateByUrl('/approval');
      }
}
