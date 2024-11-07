import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodeutilityService } from '../nodeutility.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
   msg:string="";
   user1:string | null="";
   constructor(private util:NodeutilityService,private router:Router)
   {

   }
   ngOnInit(): void {
    // Retrieve the 'user' value from local storage
    this.user1 = localStorage.getItem('user1');
  }
  onSubmit(form: any) {
    this.util.insert2(form.value.email, form.value.password).subscribe((data) => {
        if (data.status){
          localStorage.setItem("user1",form.value.email);
          this.msg = data.message;
          this.router.navigate(['/dashboard']);
        }

        else{
          this.msg = data.message;
        }

      });
  }
}
