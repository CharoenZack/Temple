import { Component, OnInit } from '@angular/core';
import { Baggage } from '../../shared/interfaces/baggage';
import { BaggageService } from '../../shared/service/baggage.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { LocationService } from '../location/location.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  location: any;
  locationName: String;
  locations: any[];
  public filteredLocation: any[];
  public role: string;
  public menu: MenuItem[];
  public formEdit: FormGroup;
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
        if (res.status == 'Success') {
          this.locations = res.data;
        }
      },
      error => {
        console.log(error['error']['message']);

      }
    )
    this.cols = [
      { field: 'number', header: 'หมายเลขตู้' },
      { field: 'locationName', header: 'สถานที่' },
    ];

    this.breadCrumbService.setPath([
      { label: 'Locker management: จัดการตู้สัมภาระทั้งหมด', routerLink: '/baggages' }
    ]);

    this.authService.getRole().subscribe(res => this.role = res);
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

  showEditButton(...role) {
    return role.includes(this.role);
  }
  showEdit(data) {

    this.newBaggage = false;
    this.baggage = this.items.filter(e => e.locationId === data.locationId && e.number === data.number)[0];
    console.log(this.baggage);

    this.baggageNumber = this.baggage['number'];
    this.location = {
      id: this.baggage['locationId'],
      name: this.baggage['locationName']
    }
    console.log(this.location);

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
    const data = {
      number: this.baggageNumber,
      locationId: this.location['id']
    };
    console.log(data);

    this.baggageService.save(data).toPromise().then(res => {
      if (res['status'] === 'Success') {
        console.log(res['data'][0]);
        this.items = [
          ...this.items,
          {
            number: data.number,
            locationName: this.location['name'],
            locationId: data.locationId,
          }
        ];
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
    this.baggage = { number: '', id: '' };
    this.baggageNumber = '';
    this.displayDialog = false;
  }
  showDialogToAdd() {
    this.newBaggage = true;
    this.baggage = { number: '', id: '' };
    this.displayDialog = true;
  }
  filterLocationMultiple(event) {
    let query = event.query;
    console.log(query);
    this.filteredLocation = this.filterLocation(query, this.locations);
  }
  filterLocation(query, locations: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < locations.length; i++) {
      let location = locations[i]
      if ((location.name).indexOf(query) == 0) {
        filtered.push(location);
      }
    }
    return filtered;
  }
}

