import { Component, OnInit } from '@angular/core';
import { location } from '../../shared/interfaces/location';
import { LocationService } from './location.service';

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
  constructor(
    private locationService:LocationService,
  ) { }

  ngOnInit() {

    this.locations = this.locationService.getLocation()
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
    console.log(this.location);
    
    this.locations = this.locationService.save(this.location.name);
    this.location = {};
    this.displayDialog = false;
  }
  clear() {
    this.location = {};
  }
  showEdit(id) {
    this.newLocation = false;
    this.location =this.locations.filter(e => e.id == id)[0]
    this.displayDialog = true;
}
  delete(id){
    this.locationService.delete(id);

  }

}
