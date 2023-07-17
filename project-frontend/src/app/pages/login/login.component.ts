import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes.constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private authService:AuthService,
    private router:Router) { }

    async ngOnInit(){
      this.initForm();
   await this.checkLoggedInUser();

  }
  async checkLoggedInUser(): Promise<void> {
    try {
      const loggedInUser = await this.authService.getUser();
      if (loggedInUser) {
        this.router.navigate([ROUTES.DASHBOARD]);
      }
    } catch (err) {
      console.log(err);
    }
  }
initForm()
{
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
}
  onSubmit(): void {

      const  email= this.loginForm.value.email;
      const  password= this.loginForm.value.password;

    if (this.loginForm.valid )

  this.authService
    .signIn(email, password)
    .then(async (data) => {
      console.log(data)
      this.router.navigate([ROUTES.DASHBOARD]);
    })
    .catch((err) => {
     console.log(err)
    });
    console.log(this.loginForm)
  }
}
