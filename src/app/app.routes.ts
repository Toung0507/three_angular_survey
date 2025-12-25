import { Routes } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { LoginComponent } from './page/login/login.component';
import { AdminComponent } from './page/admin/admin.component';
import { FormListComponent } from './page/form-list/form-list.component';
import { FillFormComponent } from './fill-form/fill-form.component';

// 加 title 可以設定網頁上面的顯示
export const routes: Routes = [
  { path: '', component: IndexComponent, title: '問卷坊' },
  { path: 'login', component: LoginComponent, title: '登入 ' },
  { path: 'form-list', component: FormListComponent, title: '表單' },
  { path: 'fill-form', component: FillFormComponent, title: '填寫表單' },
  { path: 'admin', component: AdminComponent, title: '管理者' }
];
