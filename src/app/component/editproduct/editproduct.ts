import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './editproduct.html',
  styleUrl: './editproduct.css',
})
export class Editproduct {
  baseUrl = 'https://bakery-management-system-o3hw.onrender.com/api/product/';
  productId: string = '';
  product: any = {
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  };
categoryGroups = [
  {
    name: "Cakes & Pastries",
    items: ["Chocolate Cake", "Vanilla Cake", "Brownies", "Cupcakes"]
  },
  {
    name: "Breads",
    items: ["White Bread", "Brown Bread", "Garlic Bread"]
  },
  {
    name: "Buns & Rolls",
    items: ["Burger Buns", "Dinner Rolls", "Croissants"]
  },
  {
    name: "Snacks & Savories",
    items: ["Veg Puff", "Paneer Puff", "Khari", "Pizza"]
  },
  {
    name: "Desserts",
    items: ["Doughnuts", "Custard", "Tarts"]
  },
  {
    name: "Beverages",
    items: ["Cold Coffee", "Tea", "Milkshake"]
  }
];

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = localStorage.getItem('edit_product_id') || '';
    if (!this.productId) {
      alert('No product ID found.');
      return;
    }

    this.http.get(this.baseUrl + this.productId).subscribe({
      next: (res: any) => {
        this.product = res;
        this.imagePreview = 'http://localhost:5000/uploads/' + res.image;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load product.');
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  cancel() {
    this.router.navigate(['/navbar/products']);
  } 
  updateProduct() {
    const formData = new FormData();

    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('category', this.product.category);
    formData.append('price', this.product.price.toString());
    formData.append('stock', this.product.stock.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.put(this.baseUrl + this.productId, formData).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.router.navigate(['/navbar/products']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update product.');
      },
    });
  }
}
