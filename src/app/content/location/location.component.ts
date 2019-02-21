import { Component, OnInit } from '@angular/core';
import { location } from '../../shared/interfaces/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  displayDialog: boolean;
  newLocation: boolean;
  location: location = {};
  locations: location[];
  cols: any[];
  constructor() { }

  ngOnInit() {

    this.locations = this.getLocation()
    this.cols = [
      { field: 'name', header: 'สถานที่' },
    ]
  }

  getLocation(): location[] {
    const locations = [
      { id: 1, name: "วัด1" },
      { id: 2, name: "วัด2" },
      { id: 3, name: "วัด3" }
    ]
    return locations;
  }

  showDialogToAdd() {
    this.newLocation = true;
    this.location = {};
    this.displayDialog = true;
  }

  save() {
    let locations = [...this.locations];
    if (this.newLocation)
      locations.push(this.location);
    this.locations = locations;
    this.location = null;
    this.displayDialog = false;
  }
  clear() {
    this.location = {};
  }
}
