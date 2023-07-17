import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_ROUTES } from 'src/app/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) {}
  imageUploaded: EventEmitter<string> = new EventEmitter<string>();


  getKeys(): Observable<string[]> {
    return this.http.get<string[]>(BACKEND_ROUTES.DISPLAY);
  }
  uploadImageToKeys(keys: string): void {

    this.imageUploaded.emit(keys);
  }
  uploadImage(selectedFile: File): void {
    const body = { fileName: selectedFile.name };
    this.http.post<any>(BACKEND_ROUTES.UPLOAD, body)
      .subscribe(
        (response: any) => {
          const preSignedUrl = response.preSignedUrl;
          const bucketKey = response.bucketKey;
          console.log(preSignedUrl);
          this.http.put(preSignedUrl, selectedFile)
            .subscribe(
              (response: any) => {
                this.uploadImageToKeys(bucketKey);
                console.log('Upload successful:', response);
              },
              (error: any) => {
                console.error('Upload error:', error);
              }
            );
        },
        (error: any) => {
          console.error('Error uploading image:', error);
          throw error;
        }
      );
  }



    downloadImage(imageUrl: string): void {
      this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'image.jpg'; // Specify the file name
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }

    deleteImage(imageUrl: string): void {
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      console.log(fileName)
      this.http.post(BACKEND_ROUTES.DELETE, { fileName }).subscribe(
        (response: any) => {
          console.log(response.message);
        },
        (error: any) => {
          console.error('Error deleting object:', error);
        }
      );
    }
}
