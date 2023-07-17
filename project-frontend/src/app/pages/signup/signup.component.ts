import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes.constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router:Router
    ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;

      this.authService.signup(user).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          this.router.navigate([ROUTES.LOGIN])

        },
        (error) => {
          console.error('Signup error:', error);
        }
      );
    } else {
      console.log('Invalid form data. Please check the fields.');
    }
  }
}


