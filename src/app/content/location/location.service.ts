import { Injectable } from '@angular/core';
import { location } from '../../shared/interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  displayDialog: boolean;
  newLocation: boolean;
  location: location;
  locations: location[];
  constructor() { }


  getLocation(): location[] {
    const locations = [
      { id: 1, name: "วัด1" },
      { id: 2, name: "วัด2" },
      { id: 3, name: "วัด3" }
    ]
    return locations;
  }
  

  save(data) {
    let locations = this.getLocation();
    let l = locations.length
    return [...locations,
    {
      id: l+1,
      name: data
    }
    ];
    
  }
  showEdit(id) {
    return  this.locations.filter(e => e.id == id)[0];
   
}
  delete(id){
    const index = this.locations.findIndex(e => e.id == id);
    return [
      ...this.locations.slice(0,index),
      ...this.locations.slice(index+1),
    ]
    
  }
}
