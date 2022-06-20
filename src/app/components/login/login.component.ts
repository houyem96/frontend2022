import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';  
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
//incorrect : boolean = false ;
  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/dashboard']);
      },
      err => { console.log(this.isLoginFailed)
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  email_section = true;
  code_section = false;
  password_section = false;
  mdp = ""
  
  cancel_change() {
    let element: HTMLElement = document.getElementById('close') as HTMLElement;
    element.click();
    this.email_section = true;
    this.code_section = false;
    this.password_section = false;
    this.code = "";
    this.email = ""

  }

  hide() { }
  email = "";


  open_model() {
    this.cancel_change();
  }


  email_group = new FormGroup(
    {
      email_filed: new FormControl('', Validators.email),
    })
  /* get email() {
     return this.email_group.get('email_filed') as FormControl;
   }
 */
   conversionEncryptOutput:any
   code_email:any
  pass() {
    
      this.authService.check_email(this.email).subscribe(
        (response:any)=> {
          console.log(response);
          if (response == "user not found")
            console.log(response);
          else {
            this.code_email=response;
            this.email_section = false;
            this.code_section = true;
            this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.code_email,"secure_code").toString();
            localStorage.setItem("code",this.conversionEncryptOutput)
          }  
          
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }

  code_decrypt="";
  code=""
  code_correct = true;
  verif_code() {

    this.code_decrypt=CryptoJS.AES.decrypt(localStorage.getItem('code'),"secure_code").toString(CryptoJS.enc.Utf8);  
   if (this.code == this.code_decrypt)
   {
    this.code_section = false;
    this.password_section = true;
   }
   else
   {
     this.code_correct=false;
   } 
  }

  confirm_password = true;
  msg_success: any;
  loginuser: any;
  /*change_password() {
    var new_mdp = (<HTMLInputElement>document.getElementById("new_mdp")).value;
    var confirm_mdp = (<HTMLInputElement>document.getElementById("confirm_mdp")).value;
    if (new_mdp != confirm_mdp) {
      this.confirm_password = false;
      let element: HTMLElement = document.getElementById('confirm_mdp') as HTMLElement;
      element.className = element.className + " is-invalid"
    }
    else {
      this.confirm_password = true;
      let element: HTMLElement = document.getElementById('confirm_mdp') as HTMLElement;
      element.className = "form-control"
      this.userservice.change_pw_email(this.email, new_mdp).subscribe(
        (response: any) => {
          this.cancel_change()
          this.change_success(response.result)
        },
        (error: HttpErrorResponse) => {
          if (error.status == 403) {
            localStorage.clear();
            this.userservice.clear();
            this.router.navigateByUrl('/login');

          }
        }
      )
    }
  }*/
}
