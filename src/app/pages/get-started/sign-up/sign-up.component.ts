import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  // Form Management
  @Input() user: any;

  signUpForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.min(6)]),

  });

constructor(private dataService: DataService){}


handleSubmit(){
  console.log('This is the form info', this.signUpForm.value);
  const newUser = this.signUpForm.value;
  delete newUser.confirmPassword;
  newUser.email = this.user;

  //Still I have to hash the password. It's not recommended doing it from the client-side. Something to add to the back-end later.

  this.dataService.createUser(newUser).subscribe(()=>{
    console.log('New user created')
  },(error)=>{
    console.error('Error adding the new user', error);
  });
}


}
