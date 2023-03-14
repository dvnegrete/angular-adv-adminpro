import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;
  public loginForm:FormGroup  = this.fb.group({
    email: [ 
      localStorage.getItem('email') || '' ,
      [ Validators.required, Validators.minLength(3), Validators.email]
          ],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    remember: false
  });

  constructor(
                private router: Router,
                private fb: FormBuilder,
                private userService: UserService,
                private ngZone: NgZone
    ){}
  ngAfterViewInit(): void {
    this.googleIdentityInit();
  }

  googleIdentityInit(){
    google.accounts.id.initialize({
      client_id: "632717658270-sm4kpeth4eq9e0ob68h1fk2f8l849srr.apps.googleusercontent.com",
      //callback: this.handleCredentialResponse
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    
    console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle(response.credential)
    .subscribe( (res)=> {
      console.log({login: res})
      // this.ngZone.run( ()=>{
      //   this.router.navigateByUrl('/');
      // })
    });
  }

  login(){
    this.userService.login(this.loginForm.value)
      .subscribe( res =>{
        console.log(res)
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        } else{
          localStorage.removeItem('email');
        }
        //Navegación al dashboard
        this.router.navigateByUrl('/');
      }, (err) => Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Cool'
        })
      ) 
      //Redirección a otra URL
      //this.router.navigateByUrl('/');
  }
}
