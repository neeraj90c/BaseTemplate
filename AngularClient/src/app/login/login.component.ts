import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { AuthToken, User, UserLoginDTO } from '../interface/User';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';
import { JwtService } from '../services/jwt.service';
import { environment } from '../../environments/environment'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false
  COMPANY_CODE = environment.COMPANY_CODE
  TITLE = environment.title
  title = this.TITLE


  constructor(private fb: FormBuilder, private serverService: ServerService, private router: Router, private _userService: UserService, private loaderService: LoaderService,
    private jwt: JwtService

  ) {


    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      companyCode: ['string']
    });
  }
  ngOnInit(): void {
    if (this.serverService.isAuthenticated()) {
      this.router.navigate(['/'])
    }
    this.loaderService.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading
    })
  }

  loginError: string | null = null;

  loginUser() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.serverService.userlogin(formData).subscribe(res => {
        if (res.data.token.trim() != "") {
          localStorage.setItem('access_token', res.data.token.trim())
          this.serverService.validateToken().subscribe(
           { next:(res)=>{
            this._userService.saveUserData(res)
            this.router.navigate(['/'])
          },
          error:(err)=>{
            this.serverService.SignOutUser()
          }}
          )
        } else {
          this.loginError = res.data.designation
        }
      })
    }
  }



}
