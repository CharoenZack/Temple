import { Component, OnInit } from '@angular/core';
import { location } from '../../shared/interfaces/location';
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
  location: location;
  locations: location[];
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
    ]
  }

  showDialogToAdd() {
    this.newLocation = true;
    this.location = {};
    this.displayDialog = true;
  }

  save() {
    const locationUpdate = {
      name: this.locationNameEdit
    }
    this.locationService.save(locationUpdate).toPromise().then(res => {
      console.log(res);
      if (res['status'] === 'Success') {
        this.locations = [
          ...this.locations,
          res['data']
        ]

        this.messageService.add({severity:'success', summary:'เพิ่มสำเร็จ', detail:'สถานที่ : '+res['data']['name']});
      }
    })
    this.clear()

  }
  clear() {
    this.location = {};
    this.locationNameEdit = '';
    this.displayDialog = false;
  }
  showEdit(id) {
    this.newLocation = false;
    this.location = this.locations.filter(e => e.id == id)[0]
    this.locationNameEdit = this.location['name']
    this.displayDialog = true;
  }
  delete(id) {
    const index = this.locations.findIndex(e => e.id === id)
    console.log(index);
    this.locationService.delete(id).toPromise()
    .then(res=>{
      if(res['status']=="Success"){
        this.locations = [
          ...this.locations.slice(0, index),
          ...this.locations.slice(index + 1)
        ]
        this.messageService.add({severity:'success', summary:'ลบสำเร็จ'});
      }
    });


  }

  getLocation() {
    this.locationService.getLocation()
      .toPromise().then(res => {
        this.locations = res
      })
  }

  update() {
    const locationUpdate = {
      id: this.location['id'],
      name: this.locationNameEdit
    }
    this.locationService.update(locationUpdate).toPromise().then(res => {
      if (res['status'] === 'Success') {
        const index = this.locations.findIndex(e => e.id == res['data']['id']);
        this.locations[index].name = res['data']['name']
      }

      this.messageService.add({severity:'success', summary:'แก้ไขสำเร็จ', detail:'สถานที่ : '+res['data']['name']});
    })
    this.clear()
  }

}
