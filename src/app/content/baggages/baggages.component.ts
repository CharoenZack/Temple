import {Component, OnInit} from '@angular/core';
import {Baggage} from '../../shared/interfaces/baggage';
import {BaggageService} from '../../shared/service/baggage.service';
import {MenuItem} from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';


@Component({
    selector: 'app-baggages',
    templateUrl: './baggages.component.html',
    styleUrls: ['./baggages.component.css']
})
export class BaggagesComponent implements OnInit {

    displayDialog: boolean;
    items: Baggage[];
    newBaggage: boolean;
    baggage: Baggage;
    baggageNumber: String;
    cols: any[];
    public role:string;
    public menu: MenuItem[];

    constructor(
        private baggageService: BaggageService,
        private breadCrumbService:BreadcrumbService,
        private authService:AuthService,
    ) {
    }

    ngOnInit() {

        // this.items = this.baggage.getItem();
        this.getData();

        this.cols = [
            // {field: 'date',header: 'วันที่'},{field: 'id',header: 'หมายเลขตู้'},{field: 'status',header:'สถานะ'}
            {field: 'createDate', header: 'วันที่'}, 
            {field: 'number', header: 'หมายเลขตู้'},
            {field: 'status', header: 'สถานะ'}
        ];
        this.breadCrumbService.setPath([
            {label: 'Baggages manage: จัดการสัมภาระ'}
        ]);
        this.authService.getRole().subscribe(res => this.role = res)
    }

    private getData(){
        this.baggageService.getItem().toPromise().then(res => {
            if (res['status'] === 'Success') {
                this.items = res['data'];
                console.log(this.items);
            }
        }).catch((e) => console.log(e['error']['message']));
    }

    showEditButton(...role) {
        if (role.includes(this.role)) {
          return true;
        } else {
          return false;
        }

        role.includes(this.role) ?true:false;
      }

    showEdit(id) {
        console.log(id);
        this.newBaggage = false;
        this.baggage = this.items.filter(e => e.id === id)[0];
        console.log(this.baggage['number']);
        this.baggageNumber = this.baggage['number'];
        this.displayDialog = true;
    }

    delete(id) {
        const index = this.items.findIndex(e => e.id === id);
        console.log(index);
        this.baggageService.delete(id).toPromise()
            .then(res => {
                if (res['status'] === 'Success') {
                    this.items = [
                        ...this.items.slice(0, index),
                        ...this.items.slice(index + 1)
                    ];
                }
            }).catch((e) => console.log(e['error']['message']));


    }

    save() {
        const baggage = {
            name: this.baggageNumber
        };
        this.baggageService.save(baggage).toPromise().then(res => {
            console.log(res);
            if (res['status'] === 'Success') {
                this.items = [
                    ...this.items,
                    res['data']
                ];
            }
        }).catch((e) => console.log(e['error']['message']));
        this.clear();

    }

    update() {
        const data = {
            id: this.baggage['id'],
            number: this.baggageNumber
        };
        this.baggageService.update(data)
            .subscribe(res => {
                    if (res['status'] === 'Success') {
                        const index = this.items.findIndex(e => e.id === res['data']['id']);
                        this.items[index].number = res['data']['number'];
                    }
                },
                (e) => {
                    console.log(e['error']['message']);
                });
        this.clear();
    }

    clear() {
        this.baggage = { number: '', id: ''};
        this.baggageNumber = '';
        this.displayDialog = false;
    }


    showDialogToAdd() {
        this.newBaggage = true;
        this.baggage = { number: '', id: ''};
        this.displayDialog = true;
    }
}
