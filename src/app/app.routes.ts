import { Routes } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { LoginComponent } from './page/login/login.component';
import { AdminComponent } from './page/admin/admin.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }
];
