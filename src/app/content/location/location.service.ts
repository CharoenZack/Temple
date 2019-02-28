import { Injectable } from '@angular/core';
import { location } from '../../shared/interfaces/location';
import { HttpClient } from '@angular/common/http';
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
    private http:HttpClient
  ) { }


  getLocation() {
    return this.http.get('http://localhost:3999/api/v1/locations')
    .pipe(map(res=>{
      return res['data'].map(data=>{
        return {
          id:data['locationId'],
          name:data['locationName']
        }
      })
    }))
  }
  

  save(data) {
    this.http.put(`http://localhost:3999/api/v1/locations/${data['id']}`,{
        locationName:data['name']
    }).subscribe(console.log)
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
