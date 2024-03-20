import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  type : string = "password";
  isText : boolean = false;
  eyeIcon: string = "fa-eye-slash";
  registerForm! : FormGroup;
  constructor(private router : Router, private fb: FormBuilder, private auth : AuthService) {
  }

  ngOnInit():void{
    this.registerForm = this.fb.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  OnCreate(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      this.auth.register(this.registerForm.value)
      .subscribe({
        next:()=>{
          alert("User Created");
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      this.validateAllFormFields(this.registerForm);
      alert("You need to fill all your information");
    }
  }

  private validateAllFormFields(formgroup: FormGroup){
    Object.keys(formgroup.controls).forEach(field=>{
      const control = formgroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  HideShow(){
    this.isText =! this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";
    
  }
}
