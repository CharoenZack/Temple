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
  locationNameEdit:String;
  constructor(
    private locationService: LocationService,
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
      name:this.locationNameEdit
    }
    this.locationService.save(locationUpdate).toPromise().then(res=>{
      if(res['result'] === 'Success'){
        console.log(this.locations.length);
        this.locations =  [
          ...this.locations,{
            id:res['data'][0]['locationId'],
            name:res['data'][0]['locationName'],
          }
        ]
      }
    })
    this.clear() 
    
  }
  clear() {
    this.location = {};
    this.locationNameEdit='';
    this.displayDialog = false;
  }
  showEdit(id) {
    this.newLocation = false;
    this.location = this.locations.filter(e => e.id == id)[0]
    this.locationNameEdit = this.location['name']
    this.displayDialog = true;
  }
  delete(id) {
    this.locationService.delete(id);

  }

  getLocation() {
    this.locationService.getLocation()
      .toPromise().then(res => {
        this.locations = res
        
      }
      )
  }

  update(){
    const locationUpdate = {
      id:this.location['id'],
      name:this.locationNameEdit
    }
    this.locationService.update(locationUpdate).toPromise().then(res=>{
      if(res['result'] === 'Success'){
        const index = this.locations.findIndex(e => e.id == res['data'][0]['locationId']);     
        this.locations[index].name = res['data'][0]['locationName']
      }
    })
    this.clear()
  }

}
