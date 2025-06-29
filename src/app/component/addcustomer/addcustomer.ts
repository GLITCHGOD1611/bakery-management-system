import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcustomer',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './addcustomer.html',
  styleUrl: './addcustomer.css'
})
export class Addcustomer{

  baseurl="http://localhost:5000/api/customers/"
   http=inject(HttpClient);
  router=inject(Router);
   newcustomer = {
   name: null,
    email: null,
    phone: null,
    address: null,
    
  }
  reset() {
    this.newcustomer = {
    name: null,
    email: null,
    phone: null,
    address: null,
      
    }
  }
  back() {
    this.reset();
    this.router.navigate(['/navbar/customers']);
  }

  addcustomer() {
    
      this.http.post(this.baseurl, this.newcustomer).subscribe({
  next: (res: any) => {
    console.log(res);
    alert('customer added successfully');
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
