import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { routeGuard } from './services/route.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'category',component:CategoryComponent,canActivate:[routeGuard]},
    {path:'login',component:LoginComponent},
];
