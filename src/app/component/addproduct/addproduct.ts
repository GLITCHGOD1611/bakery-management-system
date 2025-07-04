import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.css',
})
export class Addproduct {
  baseUrl = 'https://bakery-management-system-o3hw.onrender.com/api/product/';
  newproduct = {
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  };

   categoryGroups = [
    {
      name: "Cakes & Pastries",
      items: ["Chocolate Cake", "Brownies", "Cupcakes", "Cheesecake"]
    },
    {
      name: "Breads",
      items: ["White Bread", "Brown Bread", "Garlic Bread"]
    },
    {
      name: "Buns & Rolls",
      items: ["Burger Buns", "Croissants", "Dinner Rolls"]
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

  constructor(private http: HttpClient, private router: Router) {}

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

  addproduct() {
    const formData = new FormData();
    formData.append('name', this.newproduct.name);
    formData.append('description', this.newproduct.description);
    formData.append('category', this.newproduct.category);
    formData.append('price', this.newproduct.price.toString());
    formData.append('stock', this.newproduct.stock.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      alert('Please select an image.');
      return;
    }

    this.http.post(this.baseUrl, formData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/navbar/products']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add product.');
      },
    });
  }
}
