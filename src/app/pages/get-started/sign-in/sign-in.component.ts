import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  // Form Management
  @Input() user: any;
  

  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.required]),
  });

constructor(private dataService: DataService, private router: Router){}
logIn: boolean = false;
message: string = '';

handleSubmit(){
  console.log('This is the form info', this.logInForm.value);

  const userEmail = this.user;

  this.dataService.getUser(userEmail).pipe(
    tap((user:any)=>{
      if(this.logInForm.value.password == user.password){
        this.logIn = true;
        this.router.navigate(['/dashboard'])
        this.message = "";
      }else{
        this.message = "Wrong Password"
      }
      console.log(user.password)

    })
  ).subscribe();


}
}
