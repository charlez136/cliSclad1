import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { TableComponent} from './table/table.component';
import { UserComponent} from './user/user.component';
import { FavouriteComponent} from './favourite/favourite.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { tabwrapComponent } from './tabwrap/tabwrap.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'table', component: tabwrapComponent },
  { path: 'user', component: UserComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
