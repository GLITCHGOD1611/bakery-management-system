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
  @ViewChild('donutCanvas') donutCanvas?: ElementRef;

  lineChart: any;
  donutChart: any;
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

  topCustomers: { name: string; total: number }[] = [];

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

        const productQuantityMap: { [name: string]: number } = {};
        const customerPurchaseMap: { [name: string]: number } = {};

        res.forEach(order => {
          // Tally product quantities
          if (Array.isArray(order.products)) {
            order.products.forEach((product: { name: string; quantity: number }) => {
              const name = product.name.trim().toLowerCase();
              const qty = product.quantity || 1;
              productQuantityMap[name] = (productQuantityMap[name] || 0) + qty;
            });
          }

          // Tally customer total purchases
          const customer = order.customerName?.trim();
          if (customer) {
            customerPurchaseMap[customer] = (customerPurchaseMap[customer] || 0) + (order.totalAmount || 0);
          }
        });

        // Identify top product
        let maxQty = 0;
        let topProductRawName = '';
        for (const [name, qty] of Object.entries(productQuantityMap)) {
          if (qty > maxQty) {
            maxQty = qty;
            topProductRawName = name;
          }
        }

        this.topProduct = `${topProductRawName} (${maxQty} sold)`;
        this.topProductName = topProductRawName;
        this.productSalesCount = productQuantityMap;

        // Get top 3 customers
        this.topCustomers = Object.entries(customerPurchaseMap)
          .map(([name, total]) => ({ name, total }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 3);

        this.fetchProduct();
        this.drawLineChart();
        this.drawDonutChart();
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
        this.topProductDetails = this.products.find(
          p => p.name.trim().toLowerCase() === this.topProductName
        );
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
          borderColor: '#F8B838',
          tension: 0.3,
          backgroundColor: '#FFF4D6'
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

  drawDonutChart() {
    if (!this.donutCanvas?.nativeElement || !this.productSalesCount) return;

    const labels = Object.keys(this.productSalesCount);
    const data = Object.values(this.productSalesCount);

    if (this.donutChart) this.donutChart.destroy();

    this.donutChart = new Chart(this.donutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Product Sales Overview',
          data,
          backgroundColor: [
            '#F8B838', '#FF6B6B', '#6BCB77', '#4D96FF', '#C0C0C0', '#E96479', 'rgb(84, 30, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Sales Overview by Product'
          }
        }
      }
    });
  }
}
