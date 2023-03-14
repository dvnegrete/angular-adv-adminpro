import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;
  public registerForm  = this.fb.group({
    nombre: ['Damian', [ Validators.required, Validators.minLength(3) ]],
    email: ['dvss@dasdsa.com', [ Validators.required, Validators.minLength(3), Validators.email]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
    password2: ['123456', [ Validators.required, Validators.minLength(6) ]],
    terms: [ false, [ Validators.required ]]    
  },  {
    Validators: this.equalsPassword('password', 'password2')
  });

  constructor(  private fb: FormBuilder,
                private userService: UserService,
                private router: Router
              ) { }
  
  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.createUser(this.registerForm.value).subscribe( res => {
      this.router.navigateByUrl('/dashboard')
      // Swal.fire({
      //   title: 'Registrado',
      //   text: 'Usuario Creado',
      //   icon: 'success',
      //   confirmButtonText: 'Cool'
      //   })
      }, (err) => Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Cool'
        })
    )
  }

  fieldInvalid( field: string ): boolean{
    const validation = this.registerForm.get(field)?.invalid && this.formSubmitted ? true : false
    return validation
  }

  passwordNotValid(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    
    const validation = (pass1 === pass2)&& this.formSubmitted ? true : false;
    return validation;
  }

  equalsPassword(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true})
      }
    }
  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

}
