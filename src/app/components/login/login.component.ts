import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit () {
    localStorage.clear();
  }

  onSubmit() {

    if (!this.email || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!this.email.match(emailPattern)) {
    //   alert('Please enter a valid email address.');
    //   return;
    // }

    // if (this.password.length < 4) {
    //   alert('Password must be at least 4 characters long.');
    //   return;
    // }

    this.userService.login(this.email, this.password).subscribe({
      next: (data)=>{
        if(data.authentication) {
          localStorage.setItem('jwtToken', data.token);
          this.router.navigate(['/homepage']);
        }
        else {
          alert(data.message);
        }
      },
      error: (error)=>{
        console.error("Error",error);  
      }
    })
  }
}
