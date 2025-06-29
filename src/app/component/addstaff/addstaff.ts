import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstaff',
  imports: [HttpClientModule,FormsModule],
  templateUrl: './addstaff.html',
  styleUrl: './addstaff.css'
})
export class Addstaff {
  baseurl="http://localhost:5000/api/staff/"

  http=inject(HttpClient);
  router=inject(Router);
   newstaff = {
     name: null,
    email: null,
    password: null,
    role: null,
    address: null,
    
  }
  reset() {
    this.newstaff = {
     name: null,
    email: null,
    password: null,
    role: null,
    address: null,
      
    }
  }
  back() {
    this.reset();
    this.router.navigate(['/navbar/Staff']);
  }

  addstaff() {
    
      this.http.post(this.baseurl, this.newstaff).subscribe({
  next: (res: any) => {
    console.log(res);
    alert('Staff added successfully');
    this.reset();
  },
  error: (err) => {
    // Show error message from backend, if available
    const message =  err?.error?.message || 'Something went wrong';
    alert(message);
    console.error(err);
  }
});

    
   
   
  }


}
