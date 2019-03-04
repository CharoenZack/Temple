import { Injectable } from '@angular/core';
import { Baggage } from "../interfaces/baggage";
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class BaggageService {

  constructor(
    private http: HttpClient
  ) { }

  getItem() {
    return this.http.get(ApiConstants.baseURl + '/baggages')
      .pipe(
        map((response: any[]) => {
          const data = response['data'].map((data) => {
            return {
              date: formatDate(data['baggageDate'],'dd/MM/yyyy','en-US'),
              number: data['baggageNumber'],
              id:data['baggageId']
            }
          })
          // return to view
          return {
            status: response['result'],
            data: data
          }
        })
      )
  }

  update(data){
  console.log(data);
  
    const body = {
      baggageNumber:data['number'],
      baggageCreateBy : 1 
    }

    return this.http.put(ApiConstants.baseURl+`baggages/${data['id']}`,body)
    .pipe(map((res)=>{
      console.log(data,'res');
      
      return {
        status: res['result'],
        data: {
          id: res['data'][0]['baggageId'],
          number: res['data'][0]['baggageNumber']
        }
      }
    }))
    
  }

  delete(id) {
    return this.http.delete(ApiConstants.baseURl + `baggages/${id}`)
    .pipe(map(res=>{
      return {
        status: res['result']
      }
    }));
  }

  save(data){
    return this.http.post(ApiConstants.baseURl + `baggages`, {
      baggageNumber: data['name'],
      baggageCreateBy : 1 ,
    })
    .pipe(map(res=>{
      console.log(res);
      
      const data = {
        date: formatDate(res['data'][0]['baggageDate'],'dd/MM/yyyy','en-US'),
        number: res['data'][0]['baggageNumber'],
        id:res['data'][0]['baggageId']
      }
      return {
        status : res['result'],
        data:data
      }
    }))
  }
}
