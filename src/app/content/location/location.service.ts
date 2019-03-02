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
    return this.http.get(ApiConstants.baseURl + '/admin/locations')
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
      return this.http.post(ApiConstants.baseURl + `/admin/locations`, {
        locationName: data['name']
      }).pipe(map(res=>{
        return {
          status : res['result'],
          data:{
            id: res['data'][0]['locationId'],
            name: res['data'][0]['locationName']
          }
        }
      }))
  }

  update(data) {
    return this.http.put(ApiConstants.baseURl + `/admin/locations/${data['id']}`, {
      locationName: data['name']
    }).pipe(map(res=>{
      return {
        status : res['result'],
        data:{
          id: res['data'][0]['locationId'],
          name: res['data'][0]['locationName']
        }
      }
    }))
  }

  showEdit(id) {
    return this.locations.filter(e => e.id == id)[0];

  }
  delete(id) {
    return this.http.delete(ApiConstants.baseURl + `/admin/locations/${id}`)
    .pipe(map(res=>{
      return {
        status: res['result']
      }
    }));
  }
}
