import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-orderdetail',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './orderdetail.html',
  styleUrl: './orderdetail.css'
})
export class Orderdetail implements OnInit {
  baseUrl: string = 'https://bakery-management-system-o3hw.onrender.com/api/orders/'; // Replace with your real endpoint
  http = inject(HttpClient);
  router = inject(Router);

  orderDetailId: string = '';
  orderDetail: any = {}; // use object, not array

  ngOnInit(): void {
    console.log('OrderDetail Component Loaded');
    this.orderDetailId = localStorage.getItem('order_id') || '';

    if (this.orderDetailId) {
      this.getOrderDetails();
    } else {
      console.warn('No order ID found in localStorage.');
    }
  }

  getOrderDetails(): void {
    this.http.get(`${this.baseUrl}${this.orderDetailId}`).subscribe({
      next: (res: any) => {
        console.log('Order Details:', res);
        this.orderDetail = res;
      },
      error: (err) => {
        console.error('Failed to load order details:', err);
      }
    });
  }

   downloadPDF(): void {
  const content = document.getElementById('pdf-content');
  if (!content) return;

  html2canvas(content).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Order-${this.orderDetailId}.pdf`);
  });
}
}
