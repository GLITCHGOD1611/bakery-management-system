import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [HttpClientModule, LowerCasePipe, TitleCasePipe, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {

  baseurl: string = 'http://localhost:5000/api/customers/';
  http = inject(HttpClient);
  router = inject(Router);


  searchQuery: string = '';

  customerList: any[] = [];
  filteredcustomerList: any[] = [];

  ngOnInit() {
    this.http.get(this.baseurl).subscribe((res: any) => {
      this.customerList = res;
      this.filteredcustomerList = res;
    });
  }

  filtercustomerList() {
    const query = this.searchQuery.toLowerCase();
    this.filteredcustomerList = this.customerList.filter(customer =>
      customer.name.toLowerCase().includes(query)
    );
  }

  onRoleChange() {
    this.filtercustomerList();
  }

  deletcustomer(id: any) {
    this.http.delete(this.baseurl + id).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit(); // reload customer list
    });
  }

  addcustomer() {
    this.router.navigate(['/navbar/Addcustomer']);
  }

  editcustomer(id: any) {
    localStorage.setItem('cupdateid', id);
    this.router.navigate(['/navbar/Editcustomer']);
  }
}

