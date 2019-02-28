import { Injectable } from '@angular/core';
import { location } from '../../shared/interfaces/location';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  displayDialog: boolean;
  newLocation: boolean;
  location: location;
  locations: location[];
  constructor(
    private http: HttpClient
  ) { }

  // getLocations() : Observable<location> {
  //   return this.http.get(`/157.179.133.38/locations`).pipe(map(res => {
  //     const id = res['location'].id;
  //     const name = res['location'].name;
  //       return {
  //         id,
  //         name,
  //       }
  //     })
  //   )
  // }

  getLocation() {
    return this.http.get(ApiConstants.baseURl + '/locations')
      .pipe(map(res => {
        return res['data'].map(data => {
          return {
            id: data['locationId'],
            name: data['locationName']
          }
        })
      }))
  }


  save(data) {
    if (data['id']) {
      this.http.put(ApiConstants.baseURl + `/locations/${data['id']}`, {
        locationName: data['name']
      }).subscribe(console.log)
    } else {
      this.http.post(ApiConstants.baseURl + `/locations`, {
        locationName: data['name']
      }).subscribe(console.log)
    }
  }


  showEdit(id) {
    return this.locations.filter(e => e.id == id)[0];

  }
  delete(id) {
    const index = this.locations.findIndex(e => e.id == id);
    return [
      ...this.locations.slice(0, index),
      ...this.locations.slice(index + 1),
    ]

  }
}
