import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {

  // Form Management

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

constructor(private dataService: DataService){}

user: any;
showSignUp: boolean = false;
showLogIn: boolean = false;
showGetStarted: boolean = true;

userHandleSubmit(){
  console.log('This is the form info', this.userForm.value);
  const userEmail = this.userForm.value.email

  this.dataService.getUser(userEmail).pipe(
    tap((user:any)=>{
      this.user = user;
      console.log(user)

      if(!this.user){
        this.showSignUp = true;
        this.showGetStarted = false;
      }else{
        this.showLogIn = true;
        this.showGetStarted = false;
      }
    })
  ).subscribe();
  
  console.log(this.user)
}

// Fields control





}
