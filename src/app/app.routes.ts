import { Routes } from '@angular/router';
import { Addstaff } from './component/addstaff/addstaff';
import { Customers } from './component/customers/customers';
import { Dashboard } from './component/dashboard/dashboard';
import { Editstaff } from './component/editstaff/editstaff';
import { Login } from "./component/login/login";
import { Navbar } from './component/navbar/navbar';
import { Orders } from './component/orders/orders';
import { Products } from './component/products/products';
import { Reports } from './component/reports/reports';
import { Staff } from './component/staff/staff';

export const routes: Routes = [
  // Redirect to login if no path is provided
     { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
    {
    path: 'navbar',
    component: Navbar,
    children: [
      
        { path: 'dashbord', component: Dashboard },
        {path: 'products',component: Products},
        {path: 'orders',component: Orders},
        {path: 'customers',component: Customers},
        {path:'reports',component: Reports},
       {path:'Staff',component: Staff},
       {path:'AddStaff',component: Addstaff},
       {path :'Editstaff', component: Editstaff},
        
    ]
  },
 
 
];
