import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
//import { HttpClient } from "@angular/common/http";
import { Mockupdata } from '../interfaces/mockupdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth : Mockupdata;

  loggedIn = new BehaviorSubject<boolean>(false);
  keepToken: string;
  constructor(
    //private http:HttpClient,
    private router:Router,
  ) { 
  }

    login(email,password){
      
      if("test@test.com" == email && "123456" == password ){
        this.router.navigate(['/'])
        this.loggedIn.next(true)
      }else{
        console.log("false");
      }
    }
    

 /* isLoggedIn(): BehaviorSubject<boolean>{
    if(localStorage.getItem('loggedIn') == 'true'){
      this.loggedIn.next(true)
    }
    
    return this.loggedIn;
  }
  signIn(data){
    this.loggedIn.next(true)
  }
  login(data){
    
    const user = this.http.post('/api/sessions',data , {observe: 'response'})
    user.subscribe(res=>{
     const auth = res.headers.get('Authorization')
     const token = auth.match(/Bearer (.*)/)[1]
      localStorage.setItem('accessToken',token)
      this.keepToken = localStorage.getItem('accessToken')
      this.loggedIn.next(true);

      localStorage.setItem('loggedIn', 'true')
      this.router.navigateByUrl('/');
    } ,error=>console.log(error))
  }
  register(data){
    const user = this.http.post('/api/users',data)
    user.subscribe(res=>{
      this.router.navigateByUrl('/articles');
    } ,error=>console.log(error))
  }
  logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('loggedIn')

    this.loggedIn.next(false);
    this.router.navigateByUrl('/')
  }*/
}
