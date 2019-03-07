import { Component, OnInit } from '@angular/core';
import { Location } from '../../shared/interfaces/location';
import { LocationService } from './location.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  displayDialog: boolean;
  newLocation: boolean;
  location: Location;
  locations: Location[];
  cols: any[];
  locationNameEdit: String;
  constructor(
    private locationService: LocationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getLocation();
    this.cols = [
      { field: 'name', header: 'สถานที่' },
    ];
  }

  showDialogToAdd() {
    this.newLocation = true;
    this.location = {};
    this.displayDialog = true;
  }

  save() {
    this.messageService.clear();
    this.location['name'] = this.locationNameEdit;
    this.locationService.save(this.location).toPromise().then(res => {
      if (res['status'] === 'Success') {
        this.locations = [
          ...this.locations,
          res['data']
        ];

        this.messageService.add({severity: 'success', summary: 'เพิ่มสำเร็จ', detail: 'สถานที่ : ' + res['data']['name']});
      }
    });
    this.clear();

  }
  clear() {
    this.location = {};
    this.locationNameEdit = '';
    this.displayDialog = false;
  }
  showEdit(id) {
    this.newLocation = false;
    this.location = this.locations.filter(e => e.id === id)[0];
    this.locationNameEdit = this.location['name'];
    this.displayDialog = true;
  }
  delete(id) {
    this.messageService.clear();
    const index = this.locations.findIndex(e => e.id === id);
    this.locationService.delete(id).toPromise()
    .then(res => {
      if ( res['status'] === 'Success' ) {
        this.locations = [
          ...this.locations.slice(0, index),
          ...this.locations.slice(index + 1)
        ];
        this.messageService.add({severity: 'success', summary: 'ลบสำเร็จ'});
      }
    });
  }
  getLocation() {
    this.locationService.getLocation()
      .toPromise().then(res => {
        if (res['status'] === 'Success') {
          this.locations = res['data'];
        }
      });
  }

  update() {
    this.messageService.clear();
    this.location['name'] = this.locationNameEdit;
    this.locationService.update(this.location).toPromise().then(res => {
      if (res['status'] === 'Success') {
        const index = this.locations.findIndex(e => e.id === res['data']['id']);
        this.locations[index].name = res['data']['name'];
      }
      this.messageService.add({severity: 'success', summary: 'แก้ไขสำเร็จ', detail: 'สถานที่ : ' + res['data']['name']});
    });
    this.clear();
  }

}
