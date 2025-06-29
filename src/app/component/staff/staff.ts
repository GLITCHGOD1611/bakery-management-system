import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  imports: [HttpClientModule, UpperCasePipe, TitleCasePipe, FormsModule],
  templateUrl: './staff.html',
  styleUrl: './staff.css',
  standalone: true
})
export class Staff {
  baseurl: string = 'http://localhost:5000/api/staff/';
  http = inject(HttpClient);
  router = inject(Router);

  role: string = 'All';
  searchQuery: string = '';

  staffList: any[] = [];
  filteredStaffList: any[] = [];

  ngOnInit() {
    this.http.get(this.baseurl).subscribe((res: any) => {
      this.staffList = res;
      this.filteredStaffList = res;
    });
  }

  filterStaffList() {
    const query = this.searchQuery.toLowerCase();
    this.filteredStaffList = this.staffList.filter(staff =>
      staff.name.toLowerCase().includes(query) &&
      (this.role === 'All' || staff.role === this.role)
    );
  }

  onRoleChange() {
    this.filterStaffList();
  }

  deletstaff(id: any) {
    this.http.delete(this.baseurl + id).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit(); // reload staff list
    });
  }

  addstaff() {
    this.router.navigate(['/navbar/AddStaff']);
  }

  editstaff(id: any) {
    localStorage.setItem('updateid', id);
    this.router.navigate(['/navbar/Editstaff']);
  }
}
