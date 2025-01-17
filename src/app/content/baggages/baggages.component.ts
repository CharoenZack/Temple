import { Component, OnInit } from '@angular/core';
import { Baggage } from '../../shared/interfaces/baggage';
import { BaggageService } from '../../shared/service/baggage.service';
import { MenuItem, Message } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { LocationService } from '../location/location.service';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Location } from 'src/app/shared/interfaces/location';

@Component({
  selector: 'app-baggages',
  templateUrl: './baggages.component.html',
  styleUrls: ['./baggages.component.css']
})
export class BaggagesComponent implements OnInit {

  displayDialog: boolean;
  items: any[];
  newBaggage: boolean;
  baggage: Baggage;
  baggageNumber: String;
  cols: any[];
  location: Location;
  locationName: String;
  locations: any[];
  public filteredLocation: any[];
  public role: string;
  public menu: MenuItem[];
  public formEdit: FormGroup;
  public msgs: Message[] = [];

  constructor(
    private baggageService: BaggageService,
    private breadCrumbService: BreadcrumbService,
    private authService: AuthService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.getData();
    this.locationService.getLocation().subscribe(
      res => {
        if (res.status === 'Success') {
          this.locations = res.data;
        }
      },
      error => {
        console.log(error['error']['message']);

      }
    );
    this.cols = [
      { field: 'number', header: 'หมายเลขตู้' },
      { field: 'locationName', header: 'สถานที่' },
      // { field: 'status', header: 'สถานะ'},
    ];

    this.breadCrumbService.setPath([
      { label: 'จัดการสัมภาระทั้งหมด', routerLink: '/baggages' }
    ]);

    this.authService.getRole().subscribe(res => this.role = res);
    this.createForm();

  }

  private getData() {
    this.baggageService.getItem().subscribe(
      res => {
        if (res['status'] === 'Success') {
          this.items = res['data'];
        }
        console.log(this.items);
      },
      (e) => console.log(e['error']['message'])
    );
  }

  createForm() {
    this.formEdit = this.formBuilder.group(
      {
        number: ['', Validators.required],
        locationName: ['', Validators.required],
      }
    );
  }
  showEditButton(...role) {
    return role.includes(this.role);
  }
  showEdit(id) {
    this.newBaggage = false;
    this.baggage = this.items.filter(e => e.id === id)[0];
    this.baggageNumber = this.baggage['number'];
    this.location = {
      id: +this.baggage['locationId'],
      name: this.baggage['locationName']
    };
    console.log(this.location);

    this.displayDialog = true;
  }

  delete(id) {
    this.msgs = [];
    console.log(id);
    const index = this.items.findIndex(e => e.locationId === id.locationId && e.number === id.number);
    console.log(index);
    this.baggageService.delete(id).toPromise()
      .then(res => {
        if (res['status'] === 'Success') {
          this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลบตู้สัมภาระสำเร็จ' }];
          this.items = [
            ...this.items.slice(0, index),
            ...this.items.slice(index + 1)
          ];
        } else {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'ลบตู้สัมภาระไม่สำเร็จ' }];
        }
      }).catch((e) => console.log(e['error']['message']));
  }
  save() {
    this.msgs = [];
    const data = {
      number: this.baggageNumber,
      locationId: this.location['id']
    };
    console.log(data);
      this.baggageService.save(data).toPromise().then(res => {
        if (res['status'] === 'Success') {
          this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'เพิ่มตู้สัมภาระสำเร็จ' }];
          console.log(res['data'][0]);
          this.items = [
            ...this.items,
            res['data'][0]
          ];
        } else {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มตู้สัมภาระไม่สำเร็จ' }];
        }
      }).catch((e) => console.log(e['error']['message']));
      this.clear();


  }
  update() {
    const data = {
      id: this.baggage['id'],
      number: this.baggageNumber,
      locationId: this.location['locationId']
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
    this.baggage = { lockerNumber: '', baggageId: '' };
    this.baggageNumber = '';
    this.displayDialog = false;
    this.formEdit.reset();
  }
  showDialogToAdd() {
    this.newBaggage = true;
    this.baggage = { lockerNumber: '', baggageId: '' };
    this.displayDialog = true;
  }
  filterLocationMultiple(event) {
    const query = event.query;
    console.log(query);
    this.filteredLocation = this.filterLocation(query, this.locations);
  }
  filterLocation(query, locations: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      if ((location.name).indexOf(query) === 0) {
        filtered.push(location);
      }
    }
    return filtered;
  }
}

