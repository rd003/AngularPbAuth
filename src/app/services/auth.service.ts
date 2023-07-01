import { Injectable } from '@angular/core';
import PocketBase from 'PocketBase';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();

  async login(username:string,password:string) {
     const pb = new PocketBase(environment.baseUrl);
     const authData = await pb.collection('users').authWithPassword(username, password);
     /* after successfull login all the user related info and
     token related info will be saved in localStorage
    */
    
     // put isValid and user's email into a behaviour subject
    // pb.authStore.model?.email : user's email
    //pb.authStore.isValid : if token is not expired then it is true;
     this.userSubject.next({ isValid: pb.authStore.isValid, username: pb.authStore.model?.email });
     
     console.log(pb.authStore.isValid);
     console.log(pb.authStore.token);
     return true;
  }

  async logout() {
    const pb = new PocketBase(environment.baseUrl);
    pb.authStore.clear();
  }

  updateUserSubjet() {
    const pb = new PocketBase(environment.baseUrl);
    this.userSubject.next({ isValid: pb.authStore.isValid, username: pb.authStore.model?.email });
  }

  constructor() { }
}
