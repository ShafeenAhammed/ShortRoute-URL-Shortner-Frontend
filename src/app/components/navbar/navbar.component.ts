import { Component } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logged: boolean = false;
  decodedtoken!:any;
  email!:string;

  ngDoCheck () {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.decodedtoken= jwtDecode(token);
      this.email=this.decodedtoken.email;
      this.logged = true
      console.log("tokk deco",this.decodedtoken.role, this.decodedtoken);
    }else {
      this.logged = false;
    }
  }

}
