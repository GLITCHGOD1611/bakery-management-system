import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements AfterViewInit {

  orders: any[] = [];
  fromDate: string = '';
  toDate: string = '';
  today = new Date().toISOString().split('T')[0];
  thirtydaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('donateCanvas') donateCanvas!: ElementRef;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef;
  barChart: any;
  donateChart: any;
  lineChart: any;
  http = inject(HttpClient);
  router = inject(Router);
  ngOnInit() {
    this.fetchOrders()
    this.fromDate = this.thirtydaysAgo.toISOString().split('T')[0];
    this.toDate = this.today + 1;
    this.barchartmethod();
    this.donatechartmethod();
    this.linechartmethod();

  }

  ngAfterViewInit() {
    // Initialize chart logic here
    this.barchartmethod();

    this.donatechartmethod();
    this.linechartmethod();
  }
  getcharts() {
    this.barchartmethod();
  }
  // You can keep chart data and chart logic separately

  exportPDF() {
    const reportElement = document.getElementById('report-section');
    if (!reportElement) return;

    html2canvas(reportElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report.pdf');
    });
  }

  fetchOrders() {
    this.http.get<any[]>('http://localhost:5000/api/orders/').subscribe({
      next: (res) => {
        console.log('✅ Orders fetched:', res);
        this.orders = res;
      },
      error: (err) => {
        console.error('❌ Failed to fetch orders:', err);
      }
    });
  }
  barchartmethod() {
    if (!this.fromDate || !this.toDate) {

      alert('Please select date range');
      return;
    }

    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    const filteredOrders = this.orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= from && orderDate <= to;
    });

    let pending = 0, delivered = 0, cancelled = 0;
    filteredOrders.forEach(order => {
      const status = order.status.toLowerCase();
      if (status === 'pending') pending++;
      if (status === 'delivered') delivered++;
      if (status === 'cancelled') cancelled++;
    });

    // Destroy old chart
    if (this.barChart) this.barChart.destroy();

    // Create new chart
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Pending', 'Delivered', 'Cancelled'],
        datasets: [{
          label: 'Order Status Overview',
          data: [pending, delivered, cancelled],
          backgroundColor: [
            '#FFF7D5',
            '#e7ffe7',
            '#ffe6e6'
          ]
          ,
          borderColor: [
            '#e6a800',
            '#28a745',
            '#e60000',

          ],
          borderWidth: 1
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
        }
      }
    });
  }


  donatechartmethod() {
    if (!this.fromDate || !this.toDate) {
      alert('Please select date range');
      return;
    }

    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    const filteredOrders = this.orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= from && orderDate <= to;
    });

    const productCounts: { [key: string]: number } = {};

    filteredOrders.forEach(order => {
      if (Array.isArray(order.products)) {
        order.products.forEach((product: any) => {
          const name = product.name;
          if (productCounts[name]) {
            productCounts[name]++;
          } else {
            productCounts[name] = 1;
          }
        });
      }
    });

    const labels = Object.keys(productCounts);
    const data = Object.values(productCounts);

    // Destroy old chart
    if (this.donateChart) this.donateChart.destroy();

    // Create new pie chart
    this.donateChart = new Chart(this.donateCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Product Sales',
          data,
          backgroundColor: labels.map((_, i) =>
            `hsl(${(i * 37) % 360}, 80%, 70%)`
          ),
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
            text: 'Top Products Distribution'
          }
        }
      }
    });
  }

  linechartmethod() {
    if (!this.fromDate || !this.toDate) {
      alert('Please select a date range');
      return;
    }

    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    const filteredOrders = this.orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= from && orderDate <= to;
    });

    const salesPerDay: { [date: string]: number } = {};

    filteredOrders.forEach(order => {
      const dateStr = new Date(order.date).toISOString().split('T')[0];
      const total = order.totalAmount || 0;

      if (salesPerDay[dateStr]) {
        salesPerDay[dateStr] += total;
      } else {
        salesPerDay[dateStr] = total;
      }
    });

    const labels = Object.keys(salesPerDay).sort();
    const data = labels.map(date => salesPerDay[date]);

    // Destroy old chart
    if (this.lineChart) this.lineChart.destroy();

    // Create new chart
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Daily Revenue (₹)',
          data,
          fill: true,
          borderColor: '#28a745',
          tension: 0.3,
          backgroundColor: 'rgba(40, 167, 69, 0.1)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `₹${value}`
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Revenue Trend'
          }
        }
      }
    });
  }



}
