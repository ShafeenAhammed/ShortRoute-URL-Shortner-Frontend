import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name!: string;
  email!: string;
  password!: string;

  constructor(private router: Router, private userService: UserService) { }

  onSubmit() {

    if (!this.name || !this.email || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email.match(emailPattern)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (this.password.length < 4) {
      alert('Password must be at least 4 characters long.');
      return;
    }

    this.userService.register(this.name, this.email, this.password).subscribe({
      next: (data)=>{
        if(data.success) {
          this.router.navigate(['/login']);
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
