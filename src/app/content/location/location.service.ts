import { Injectable } from '@angular/core';
import { location } from '../../shared/interfaces/location';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  displayDialog: boolean;
  newLocation: boolean;
  location: location;
  locations: location[];
  constructor(
    private http:HttpClient,
  ) { }

  getLocations() : Observable<location> {
    return this.http.get(`/157.179.133.38/locations`).pipe(map(res => {
      const id = res['location'].id;
      const name = res['location'].name;
        return {
          id,
          name,
        }
      })
    )
  }


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
