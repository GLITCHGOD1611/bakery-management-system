import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addorder',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './addorder.html',
  styleUrl: './addorder.css'
})
export class Addorder {
  private apiUrl = 'https://bakery-management-system-o3hw.onrender.com/api/orders/';
  private userApi = 'https://bakery-management-system-o3hw.onrender.com/api/customers';
  private productApi = 'https://bakery-management-system-o3hw.onrender.com/api/product/';

  constructor(private http: HttpClient) {}

  totalAmount = 0;
  productsList: any[] = [];
  cart: any[] = [];
  customerList: any[] = [];

  selectedCustomer = '';
  selectedPayment = '';
  searchTerm = '';

  newOrder = {
    customerId: '',
    customerName: '',
    products: [] as {
      productId: string;
      name: string;
      quantity: number;
      price: number;
      total: number;
    }[],
    paymentMethod: '',
    status: 'Pending',
    date: '',
    totalAmount: 0
  };

  ngOnInit() {
    this.getuser();
    this.getproduct();
  }

  selectedpaymentmethod() {
    this.newOrder.paymentMethod = this.selectedPayment;
  }

  addToCart(product: any) {
    const existing = this.cart.find(item => item.productId === product._id);
    if (product.stock < 1) return;
    if (existing) {
      if (existing.quantity < product.stock) {
        existing.quantity++;
        existing.total = existing.quantity * existing.price;
      }
    } else {
      this.cart.push({
        productId: product._id,
        name: product.name,
        quantity: 1,
        price: product.price,
        total: product.price,
        image: product.image
      });
    }
    this.calculateTotal();
  }

  updateQuantity(productId: string, change: number) {
    const item = this.cart.find(p => p.productId === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1;
    item.total = item.quantity * item.price;
    this.calculateTotal();
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.calculateTotal();
  }

  onCustomerChange(customerId: string) {
    const selected = this.customerList.find(c => c._id === customerId);
    if (selected) {
      this.newOrder.customerId = selected._id;
      this.newOrder.customerName = selected.name;
      console.log('✅ Updated newOrder:', this.newOrder);
    }
  }

  calculateTotal() {
    let total = 0;
    this.cart.forEach(item => (total += item.total));
    this.newOrder.totalAmount = total;
    this.totalAmount = total;
  }

  quantityInc(item: any) {
    item.quantity++;
    item.total = item.quantity * item.price;
    this.calculateTotal();
  }

  quantitydec(item: any) {
    if (item.quantity <= 1) return;
    item.quantity--;
    item.total = item.quantity * item.price;
    this.calculateTotal();
  }

  getuser() {
    this.http.get(this.userApi).subscribe((res: any) => {
      this.customerList = res;
    });
  }

  getproduct() {
    this.http.get(this.productApi).subscribe((res: any) => {
      this.productsList = res;
    });
  }

  createOrder() {
    if (!this.newOrder.customerId || this.cart.length === 0 || !this.selectedPayment) {
      alert('Please complete the form.');
      return;
    }

    this.newOrder.products = this.cart.map(item => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.total
    }));
    this.newOrder.paymentMethod = this.selectedPayment;
    this.newOrder.date = new Date().toISOString();

    this.http.post(this.apiUrl, this.newOrder).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.cart = [];
        this.selectedCustomer = '';
        this.selectedPayment = '';
        this.newOrder = {
          customerId: '',
          customerName: '',
          products: [],
          paymentMethod: '',
          status: 'Pending',
          date: '',
          totalAmount: 0
        };
      },
      error: error => {
        alert('Failed to place order.');
        console.error('❌ Order failed:', error);
      }
    });
  }

  // ✅ Filtered products based on search
  filteredProducts() {
    if (!this.searchTerm) return this.productsList;
    const term = this.searchTerm.toLowerCase();
    return this.productsList.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }
}
