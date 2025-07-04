import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  baseurl = "https://bakery-management-system-o3hw.onrender.com/api/product/";
  productList: any[] = [];
  filteredproductList: any[] = [];

  searchQuery: string = '';
  selectedCategory: string = 'All';

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get(this.baseurl).subscribe((res: any) => {
      this.productList = res;
      console.log(this.productList);
      this.filteredproductList = res;
    });
  }

  filterproductList() {
    const query = this.searchQuery.toLowerCase();
    this.filteredproductList = this.productList.filter(product =>
      product.name.toLowerCase().includes(query) &&
      (this.selectedCategory === 'All' || product.category === this.selectedCategory)
    );
  }

  onCategoryChange() {
    this.filterproductList();
  }

  editProduct(id: string) {
    localStorage.setItem('edit_product_id', id);
    this.router.navigate(['/navbar/editproduct']);
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      this.http.delete(this.baseurl + id).subscribe(() => {
        alert('Product deleted');
        this.loadProducts();
      });
    }
  }

  addProduct() {
    this.router.navigate(['/navbar/addproduct']);
  }
}
