import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  keys: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadImage();
    this.userService.imageUploaded.subscribe((key: string) => {
      const keyUrl = environment.cloudfrontURL + key;
      this.keys.push(keyUrl);
    });
  }

  loadImage() {
    this.userService.getKeys().subscribe(
      (keys: any) => {
        this.keys = keys.map((key: string) => environment.cloudfrontURL + key);
        console.log(this.keys)
      },
      (error: any) => {
        console.error('Error retrieving keys:', error);
      }
    );

  }

  downloadImage(imageUrl: string): void {
    this.userService.downloadImage(imageUrl);
  }

  deleteImage(imageUrl: string): void {
console.log(imageUrl)
    this.userService.deleteImage(imageUrl);
    const index = this.keys.findIndex((key: string) => key === imageUrl);
    if (index !== -1) {
      this.keys.splice(index, 1);
    }
  }
}
