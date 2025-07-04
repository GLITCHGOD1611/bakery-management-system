import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editcustomer',
  imports: [HttpClientModule,FormsModule],
  templateUrl: './editcustomer.html',
  styleUrl: './editcustomer.css'
})
export class Editcustomer {

   baseurl="https://bakery-management-system-o3hw.onrender.com/api/customers/"

  updatedcustomer = {
     name: null,
    email: null,
    phone: null,
    address: null,
      
    }
id :string|null="";
http=inject(HttpClient);
router=inject(Router);
  ngOnInit(){
     this.id =localStorage.getItem('cupdateid');
     console.log("id aa gai",this.id);
     this.http.get(this.baseurl+this.id).subscribe((res:any)=>{
       console.log(res);
       this.updatedcustomer=res
       
     })
  }
  
  updatecustomer(){
    // Replace '{}' with the actual customer data you want to update
  this.http.put(this.baseurl+this.id,this.updatedcustomer).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.reset();
      alert('customer updated successfully');
      this.router.navigate(['/navbar/customer']);
    },
    error:(err:any)=>{
      console.log(err);
    }
  })
  }
  
  reset() {
    this.updatedcustomer = {
      name: null,
    email: null,
    phone: null,
    address: null,
    };
  }
  
 back() {
    this.reset();
    this.router.navigate(['/navbar/customers']);
  }

}
