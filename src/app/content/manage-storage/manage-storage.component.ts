import { Component, OnInit } from '@angular/core';
import { Baggage } from 'src/app/shared/interfaces/baggage';
import { BaggageService } from 'src/app/shared/service/baggage.service';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MenuItem } from 'primeng/api';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';

@Component({
  selector: 'app-manage-storage',
  templateUrl: './manage-storage.component.html',
  styleUrls: ['./manage-storage.component.scss']
})
export class ManageStorageComponent implements OnInit {


  displayDialog: boolean;
  items: Baggage[];
  newBaggage: boolean;
  baggage: Baggage;
  baggageNumber: String;
  cols: any[];
  public role: string;
  public menu: MenuItem[];
  public members: any[];
  public numberOfLocker: any[];
  public selectedMember: any;
  public selectedNumber: any;

  constructor(
    private baggageService: BaggageService,
    private breadCrumbService: BreadcrumbService,
    private authService: AuthService,
    private memberService: ManageUserService,
  ) {
  }

  ngOnInit() {
    this.initDialogData();
    this.getData();

    this.cols = [
      { field: 'createDate', header: 'วันที่' },
      { field: 'memberName', header: 'สมาชิก' },
      { field: 'number', header: 'หมายเลขตู้' },
      { field: 'status', header: 'สถานะ' }
    ];

    this.breadCrumbService.setPath([
      { label: 'Baggage management: จัดการคนกับสัมพาระ', routerLink: '/storage' }
    ]);

    this.authService.getRole().subscribe(res => this.role = res);
  }

  private initDialogData() {
    this.memberService.getAllUsers()
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.members = res['data'].map(res => {
            return {
              memberId: res['id'],
              memberName: res['titleName'] + res['fname'] + "  " + res['lname']
            }
          })
          console.log(this.members);

        }
      },
        err => {
          console.log(err);

        }
      )

    this.baggageService.getItem()
      .subscribe(
        res => {
          if (res['status'] === 'Success') {
            this.numberOfLocker = res['data'].map(res=>{
              return {
                baggageId:res['baggageId'],
                number:res['number']
              }
            })
          }

        }
      )
  }

  private getData() {
    this.baggageService.getItems().subscribe(
      res => {
        if (res['status'] === 'Success') {
          this.items = res['data'];
          console.log(this.items);
        }
      },
      (e) => console.log(e['error']['message'])
    );
  }

  showEditButton(...role) {
    return role.includes(this.role);
  }

  showEdit(id) {
    this.newBaggage = false;
    this.baggage = this.items.filter(e => e.id === id)[0];
    console.log(this.baggage);

    // console.log(this.baggage['number']);
    // this.baggageNumber = this.baggage['number'];
    this.displayDialog = true;
    this.selectedMember = this.baggage['memberName'];
    this.selectedNumber = this.items.filter(e => e.id === id)[0];
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
    console.log(this.selectedMember);
    console.log(this.selectedNumber);
    
    this.baggageService.saveStorage(this.selectedMember['memberId'],this.selectedNumber['baggageId'])
    // const baggage = {
    //   name: this.baggageNumber
    // };
    // this.baggageService.save(baggage).toPromise().then(res => {
    //   console.log(res);
    //   if (res['status'] === 'Success') {
    //     this.items = [
    //       ...this.items,
    //       res['data']
    //     ];
    //   }
    // }).catch((e) => console.log(e['error']['message']));
    // this.clear();

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
    // this.baggage = {number: '', id: ''};
    // this.baggageNumber = '';
    // this.displayDialog = false;
  }


  showDialogToAdd() {
    this.newBaggage = true;
    this.baggage = { number: '', id: '' };
    this.displayDialog = true;
  }
}

