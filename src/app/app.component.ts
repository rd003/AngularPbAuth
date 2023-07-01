import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/home" routerLinkActive="active" >Home</a></li>
        <li><a routerLink="/about" routerLinkActive="active">About</a></li>

        <ng-container *ngIf="user$|async as user">
             <ng-container *ngIf="user && user.isValid">
                <li><a routerLink="/category" routerLinkActive="active">Categories</a></li>
                <li><a style="cursor:pointer" (click)="logout()">Logout ({{user.username}})</a></li>
             </ng-container>
        </ng-container>
       
        <ng-container *ngIf="!(user$|async) || !(user$|async)?.isValid">
          <li><a routerLink="/login" routerLinkActive="active">Login</a></li>
        </ng-container>

      </ul>
  </nav>
  <div class="layout">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [`
   nav {
  background-color: #333;
}

ul {
  list-style-type: none;
  overflow: hidden;
}

li {
  display:inline-block;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}

.active{
  background-color: #111;
}

.layout{
  padding-top:20px;
  padding-left:10px;
}

  `],
})
export class AppComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  // fields
  user$ = this.authService.user$;

  logout() {
    this.authService.logout();
    this.authService.updateUserSubjet();
    this.router.navigate(['/login']);
  }
}
