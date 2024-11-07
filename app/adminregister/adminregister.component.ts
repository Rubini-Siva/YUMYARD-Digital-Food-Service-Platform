import { Component } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrl: './adminregister.component.css'
})
export class AdminregisterComponent {
  constructor(private util:NodeutilityService,private router:Router) { }
  msg: string = '';
  selectedFile: File | undefined; // Define selectedFile property
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }
  onSubmit(form: any) {
    // Ensure that the restaurantimage field is correctly populated
    if (!this.validateForm()) {
      return; // Stop form submission if validation fails
    }
    if (!this.selectedFile) {
      console.error('No file selected.');
      this.msg = 'Upload the image.';
    }

    const formData = new FormData();
    formData.append('email', form.value.email);
    formData.append('resname', form.value.resname);
    formData.append('restype', form.value.restype);
    formData.append('description', form.value.description);
    if (this.selectedFile) { // Add null check
      formData.append('restaurantimage', this.selectedFile, this.selectedFile.name);
    }    formData.append('address', form.value.address);
    formData.append('password', form.value.password);
    console.log(formData); // Log the FormData object to verify file attachment
    this.util.insert(formData).subscribe((data) => {
      if (data.status) {
        this.msg = data.message;
        this.router.navigate(['/adminl']);
      } else {
        this.msg = data.message;
      }
    });
  }

  validateForm(): boolean {
    const email = (<HTMLInputElement>document.querySelector('#email')).value;
    const resname = (<HTMLInputElement>document.querySelector('#resname')).value;
    const restype = (<HTMLInputElement>document.querySelector('#restype')).value;
    const description = (<HTMLInputElement>document.querySelector('#description')).value;
    const fileInput = <HTMLInputElement>document.querySelector('#restaurantimage');
    let resimage: File | null = null;
    if (fileInput.files && fileInput.files.length > 0) {
      resimage = fileInput.files[0]; // Get the first file selected (assuming single file upload)
      // Proceed with further processing...
    } else {
      // Handle case where no file is selected
      console.error('No file selected.');
      this.msg = 'Upload the image.';
      return false;
    }
    const address = (<HTMLInputElement>document.querySelector('#address')).value;
    const password = (<HTMLInputElement>document.querySelector('#password')).value;
    const confirm = (<HTMLInputElement>document.querySelector('#confirmPassword')).value;

    // Basic validation example, you can add more specific validations
    if (!email || !resname || !restype || !description || !resimage || !address || !password || !confirm) {
      this.msg = 'Please fill in all fields.';
      return false;
    }
    if (password !== confirm) {
      this.msg = 'Passwords do not match.';
      return false;
    }
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.msg = 'Please enter a valid email address.';
      return false;
    }
    return true; // Form is valid
  }
}
