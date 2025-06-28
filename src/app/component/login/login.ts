import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/staff/login'; // Update with your actual API endpoint

  username = '';
  password = '';

  login() {
    // this.router.navigate(['/navbar/dashbord']); he pn chalt

    this.http
      .post(this.apiUrl, { email: this.username, password: this.password })
      .subscribe(
        (response) => {
          // console.log(response as any);
          const role = (response as any).role;
          // console.log(role);
          localStorage.setItem('role', role);

          this.router.navigateByUrl('/navbar/dashbord');
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
