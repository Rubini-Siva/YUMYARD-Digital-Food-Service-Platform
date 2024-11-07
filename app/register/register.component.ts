import { Component } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private util:NodeutilityService,private router:Router) { }
  msg: string = '';

  onSubmit(form: any) {
    if (!this.validateForm()) {
      return; // Stop form submission if validation fails
    }
    this.util
    .insert3(
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.address,
      form.value.password
    )
    .subscribe((data) => {
      if (data.status) {
        this.msg = data.message;
        this.router.navigate(['/login']);
      } else {
        this.msg = data.message;
      }
    });
}

validateForm(): boolean {
  const name = (<HTMLInputElement>document.querySelector('#name')).value;
  const email = (<HTMLInputElement>document.querySelector('#email')).value;
  const phone = (<HTMLInputElement>document.querySelector('#phone')).value;
  const address = (<HTMLInputElement>document.querySelector('#address')).value;
  const password = (<HTMLInputElement>document.querySelector('#password')).value;
  const confirm = (<HTMLInputElement>document.querySelector('#confirmPassword')).value;

  // Basic validation example, you can add more specific validations
  if (!name || !email || !phone || !address || !password || !confirm) {
    this.msg = 'Please fill in all fields.';
    return false;
  }

  // Email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    this.msg = 'Please enter a valid email address.';
    return false;
  }

  // Phone number validation using regular expression
  const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
  if (!phoneRegex.test(phone)) {
    this.msg = 'Please enter a valid phone number (10 digits).';
    return false;
  }

  // Password validation (at least 8 characters)
  if (password.length < 8 && password.length<15) {
    this.msg = 'Password must be at least 8 characters long.';
    return false;
  }

  // Confirm password validation
  if (password !== confirm) {
    this.msg = 'Passwords do not match.';
    return false;
  }

  return true; // Form is valid
}
}
