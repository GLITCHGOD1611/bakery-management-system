import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-orderlist',
  imports: [DatePipe,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './orderlist.html',
  styleUrl: './orderlist.css'
})
export class Orderlist {
 baseUrl: string = 'http://localhost:5000/api/orders/'; // 🌐 Your API base URL

  orderList: any[] = [];
  filteredOrders: any[] = [];

  searchQuery: string = '';
  statusFilter: string = 'All';
  selectedDate: string = '';
   updatedOrder = { status: 'Delivered' };
  updatedOrderv="pending";

  constructor(private http: HttpClient , private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // ✅ Load all orders from backend
  loadOrders(): void {
    this.http.get(this.baseUrl).subscribe({

      next: (res : any) => {
        this.orderList = res;
        console.log(this.orderList);
        this.filterOrderList();
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  // 🔍 Filter based on search, status, and date
  filterOrderList(): void {
    this.filteredOrders = this.orderList.filter(order => {
      const searchMatch = order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase());
      const statusMatch = this.statusFilter === 'All' || order.status === this.statusFilter;
      const dateMatch = !this.selectedDate || order.date.startsWith(this.selectedDate); // Assuming date format: YYYY-MM-DD
      return searchMatch && statusMatch && dateMatch;
    });
  }

  // 🟡 (Demo) Edit order by ID
 editOrderstatus(orderId: string, newStatus: string): void {
  const updatedOrder = { status: newStatus };

  this.http.put(this.baseUrl + orderId, updatedOrder).subscribe({
    next: () => {
      console.log('Order updated');
      this.loadOrders();
    },
    error: (err) => {
      console.error('Error updating order:', err);
    }
  });
}

  //order detail
  orderDetail(orderId: string): void {
    localStorage.setItem('order_id', orderId);
    this.router.navigate(['/navbar/orderdetail']);
    console.log('Order detail:', orderId);
  }

  // 🟥 Delete order
  deleteOrder(orderId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    this.http.delete(this.baseUrl + orderId).subscribe({
      next: () => {
        console.log('Order deleted');
        this.loadOrders(); // Refresh list
      },
      error: (err) => {
        console.error('Error deleting order:', err);
      }
    });
  }

  // 🟢 (Demo) Add new order
  addOrder(){
   this.router.navigate(['/navbar/addorder']);

    // 💡 API for Add Order (example)
    /*
    this.http.post(`${this.baseUrl}/add`, newOrder).subscribe({
      next: () => {
        console.log('Order added');
        this.loadOrders();
      },
      error: (err) => {
        console.error('Error adding order:', err);
      }
    });
    */
  }
}
