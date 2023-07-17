import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes.constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService:UserService,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  showUserModal = false;
  showAddImageModal = false;
  selectedFile: File;


  toggleUserModal(): void {
    this.showUserModal = !this.showUserModal;
  }

  togglePlusModal(): void {
    this.showAddImageModal = !this.showAddImageModal;
  }

  cancelAddImageModal(): void {
    this.showAddImageModal = false;
  }

  file(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(event: Event): void {
    event.preventDefault();
    console.log(this.selectedFile);
    this.userService.uploadImage(this.selectedFile);
  }
async logout()
{
   await this.authService.signOut().then(()=>{
    this.authService.clearCurrentUser()
    this.router.navigate([ROUTES.LOGIN]);
   });
   console.log("hii")

}

}
