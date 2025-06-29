import { Routes } from '@angular/router';
import { Addstaff } from './component/addstaff/addstaff';
import { Customers } from './component/customers/customers';
import { Dashboard } from './component/dashboard/dashboard';
import { Editstaff } from './component/editstaff/editstaff';
import { Login } from "./component/login/login";
import { Navbar } from './component/navbar/navbar';
import { Products } from './component/products/products';
import { Reports } from './component/reports/reports';
import { Staff } from './component/staff/staff';
import { Editcustomer } from './component/editcustomer/editcustomer';
import { Addcustomer } from './component/addcustomer/addcustomer';
import { Editproduct } from './component/editproduct/editproduct';
import { Addproduct } from './component/addproduct/addproduct';
import { Orderlist } from './component/orderlist/orderlist';
import { Addorder } from './component/addorder/addorder';
import { Editorder } from './component/editorder/editorder';
import { Orderdetail } from './component/orderdetail/orderdetail';

export const routes: Routes = [
  // Redirect to login if no path is provided
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'navbar',
    component: Navbar,
    children: [

      { path: 'dashbord', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'orderlist', component: Orderlist },
      { path: 'customers', component: Customers },
      { path: 'reports', component: Reports },
      { path: 'Staff', component: Staff },
      { path: 'AddStaff', component: Addstaff },
      { path: 'Editstaff', component: Editstaff },
      { path: 'Editcustomer', component: Editcustomer },
      { path: 'Addcustomer', component: Addcustomer },
      { path: 'editproduct', component: Editproduct },
      { path: 'addproduct', component: Addproduct },
      { path: 'addorder', component: Addorder },
      { path: 'orderdetail', component: Orderdetail },

    ]
  },


];
