import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {ApprovalService} from './approval.service';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';


@Component({
    selector: 'app-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

    public menu: MenuItem[];

    constructor(
        private approvalService: ApprovalService,
        private messageService: MessageService,
        private breadCrumbService: BreadcrumbService,
    ) {
    }

    ngOnInit() {
        this.breadCrumbService.setPath([
            {label: 'Approval: การอนุมัติ', routerLink: '/approval'},
        ]);
    }

}
