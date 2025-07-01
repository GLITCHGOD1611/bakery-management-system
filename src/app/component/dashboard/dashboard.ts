import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas?: ElementRef;
  lineChart: any;
  http = inject(HttpClient);

  orders: any[] = [];
  products: any[] = [];

  totalOrders: number = 0;
  totalRevenue: number = 0;
  totalcustomers: number = 0;

  topProduct: string = '';
  topProductName: string = '';
  topProductDetails: any = null;
  productSalesCount: { [productName: string]: number } = {};

  ngAfterViewInit() {
    this.fetchOrders();
    this.fetchcustomers();
  }

  fetchOrders() {
    this.http.get<any[]>('http://localhost:5000/api/orders/').subscribe({
      next: (res) => {
        this.orders = res;
        this.totalOrders = res.length;
        this.totalRevenue = res.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        const productCountMap: { [name: string]: number } = {};
        res.forEach(order => {
          if (Array.isArray(order.products)) {
            order.products.forEach((product: { name: string }) => {
              const name = product.name;
              productCountMap[name] = (productCountMap[name] || 0) + 1;
            });
          }
        });

        // Top product
        let max = 0;
        let top = '';
        for (const [name, count] of Object.entries(productCountMap)) {
          if (count > max) {
            max = count;
            top = name;
          }
        }

        this.topProduct = `${top} (${max} sold)`;
        this.topProductName = top;

        this.fetchProduct();  // 🔁 Call after name is ready
        this.drawLineChart(); // ⏳ Chart after orders loaded
      },
      error: (err) => {
        console.error('❌ Failed to fetch orders:', err);
      }
    });
  }

  fetchProduct() {
    this.http.get<any[]>('http://localhost:5000/api/product/').subscribe({
      next: (res: any[]) => {
        this.products = res;
        this.topProductDetails = this.products.find(p => p.name === this.topProductName);
        console.log('🎯 Top Product:', this.topProductDetails);
      },
      error: (err: any) => {
        console.error('❌ Failed to fetch products:', err);
      }
    });
  }

  fetchcustomers() {
    this.http.get<any[]>('http://localhost:5000/api/customers').subscribe({
      next: (res) => {
        this.totalcustomers = res.length;
      },
      error: (err) => {
        console.error('❌ Failed to fetch customers:', err);
      }
    });
  }

  drawLineChart() {
    if (!this.lineCanvas?.nativeElement) return;

    const today = new Date();
    const past7Days: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      past7Days.push(date.toISOString().split('T')[0]);
    }

    const orderCountPerDay: { [date: string]: number } = {};
    past7Days.forEach(date => (orderCountPerDay[date] = 0));

    this.orders.forEach(order => {
      const orderDate = new Date(order.date).toISOString().split('T')[0];
      if (orderCountPerDay[orderDate] !== undefined) {
        orderCountPerDay[orderDate]++;
      }
    });

    const labels = past7Days;
    const data = labels.map(date => orderCountPerDay[date]);

    if (this.lineChart) this.lineChart.destroy();

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Orders (Last 7 Days)',
          data,
          fill: true,
          borderColor: '#007bff',
          tension: 0.3,
          backgroundColor: 'rgba(0, 123, 255, 0.1)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Orders in the Last 7 Days'
          }
        }
      }
    });
  }
}
