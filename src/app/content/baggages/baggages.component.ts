import {Component, OnInit} from '@angular/core';
import {Baggage} from '../../shared/interfaces/baggage';
import {BaggageService} from '../../shared/service/baggage.service';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';
import {AuthService} from 'src/app/shared/service/auth.service';
import { LocationService } from '../location/location.service';


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
  location: Location;
  locationName: String;
  locations: any[];
  public filteredLocation: any[];
  public role: string;
  public menu: MenuItem[];

  constructor(
    private baggageService: BaggageService,
    private breadCrumbService: BreadcrumbService,
    private authService: AuthService,
    private locationService: LocationService,
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
      {field: 'number', header: 'หมายเลขตู้'},
      {filed: 'location' ,header: 'สถานที่'}
    ];

    this.breadCrumbService.setPath([
      {label: 'Baggage management: จัดการสัมภาระทั้งหมด',routerLink: '/baggages'}
    ]);

    this.authService.getRole().subscribe(res => this.role = res);
  }

  private getData() {
    this.baggageService.getItem().subscribe(
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
        console.log(res['data'][0]);
        this.items = [
          ...this.items,
          res['data'][0]
          
        ];
        console.log(this.items);
        
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
    this.baggage = {number: '', id: ''};
    this.baggageNumber = '';
    this.displayDialog = false;

  }

  showDialogToAdd() {
    this.newBaggage = true;
    this.baggage = {number: '', id: ''};
    this.displayDialog = true;
  }

  filterLocationMultiple(event) {
    let query = event.query;
    this.filteredLocation = this.filterLocation(query, this.locations);
  }
  filterLocation(query, locations: any): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < locations.length; i++) {
      let location = locations[i]
      if ((location.fname + location.lname).toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(location);
      }
    }
    return filtered;
  }
}
