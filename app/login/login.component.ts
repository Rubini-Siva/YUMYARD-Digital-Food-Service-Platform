import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodeutilityService } from '../nodeutility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  msg:string="";
  user:string | null="";
  constructor(private util:NodeutilityService,private router:Router)
  {

  }
  ngOnInit(): void {
    // Retrieve the 'user' value from local storage
    this.user = localStorage.getItem('user');
  }
  onSubmit(form: any) {
    this.util.insert1(form.value.email, form.value.password).subscribe((data) => {
        if (data.status){
          localStorage.setItem("user",form.value.email);
          this.msg = data.message;
          this.router.navigate(['/foodpage']);
        }

        else{
          this.msg = data.message;
        }

      });
  }
}
