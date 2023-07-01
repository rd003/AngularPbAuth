import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <div class="container">
    <h2>Login</h2>
    <form [formGroup]="loginForm" (ngSubmit)="login()">
        <label for="username">Username</label>
        <input type="text" formControlName="username" placeholder="Enter your username" required>
        
        <label for="password">Password</label>
        <input type="password" formControlName="password" placeholder="Enter your password" required>
        
        <ng-container *ngIf="alert$|async as alert">
           <span [class]="alert.alertClass">{{alert.message}}</span>
        </ng-container>
        
        <input type="submit" value="Login" [disabled]="loginForm.invalid">
    </form>
  </div>
  `,
  styles: [
    `  
    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
    }
    
    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 20px;
      
    }
    
    input[type="submit"] {
      background-color: #2a35bb;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    }
    
    input[type="submit"]:hover {
      background-color: #3741b9;
    }

    .msg {
      display:block;
      margin:8px 0;
    }

    .error{
      color:red;
    }

    .pending{
      color:#656537;
    }

    .success{
      color:green;
    }

    `
  ]
})
export class LoginComponent implements OnInit {
 
  // services
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);
  private router: Router = inject(Router);

  // fields
  loginForm!: FormGroup;
  alert$ = this.alertService.alert$;

  // setter for validation purpose
  get f() {
    return this.loginForm.controls;
  }

  //methods

  async login() {
    try {
      this.alertService.setAlert({ alertClass: 'pending', message: 'wait...' });
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      const loginResult: boolean = await this.authService.login(username, password);
      this.alertService.setAlert({ alertClass: 'success', message: 'redirecting to categories' });
      this.router.navigate(['/category']);
    }
    catch (error) {
      console.log(error);
      this.alertService.setAlert({ alertClass: 'error', message: 'Invalid login or password' });
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.alertService.clearAlert();
  }
}
