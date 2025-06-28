import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editstaff',
  imports: [HttpClientModule,FormsModule],
  templateUrl: './editstaff.html',
  styleUrl: './editstaff.css'
})
export class Editstaff implements OnInit {
  baseurl="http://localhost:5000/api/staff/"

  updatedstaff = {
     name: null,
    email: null,
    password: null,
    role: null,
    address: null,
      
    }
id :string|null="";
http=inject(HttpClient);
router=inject(Router);
  ngOnInit(){
     this.id =localStorage.getItem('updateid');
     console.log("id aa gai",this.id);
     this.http.get(this.baseurl+this.id).subscribe((res:any)=>{
       console.log(res);
       this.updatedstaff=res
       
     })
  }
  
  updatestaff(){
    // Replace '{}' with the actual staff data you want to update
  this.http.put(this.baseurl+this.id,this.updatedstaff).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.reset();
      alert('Staff updated successfully');
      this.router.navigate(['/navbar/Staff']);
    },
    error:(err:any)=>{
      console.log(err);
    }
  })
  }
  
  reset() {
    this.updatedstaff = {
      name: null,
      email: null,
      password: null,
      role: null,
      address: null,
    };
  }
  
 back() {
    this.reset();
    this.router.navigate(['/navbar/Staff']);
  }


  
}
