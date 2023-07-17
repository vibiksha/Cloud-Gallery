import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { BACKEND_ROUTES } from 'src/app/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserInfo;

  constructor(private http:HttpClient) {
  }

  getJwtToken(): Promise<string> {
    return Auth.currentSession()
      .then((res) => {
        const idToken = res.getIdToken()?.getJwtToken();
        console.log(idToken)
        return idToken;
      })
      .catch((error) => {
        console.error('Error getting JWT token:', error);
        throw error;
      });
  }
  signup(signupData: any) {
    return this.http.post(BACKEND_ROUTES.SIGNUP, signupData);
  }

  signIn(username: string, password: string): Promise<any> {
    return Auth.signIn(username, password);
  }
  signOut(): Promise<any> {
    return Auth.signOut();

  }
  async getUser(): Promise<any> {
    if (!this.currentUserInfo) {
      this.currentUserInfo = await Auth.currentUserInfo();
      console.log(this.currentUserInfo);
    }
    return this.currentUserInfo;
  }
  forgotPassword(username: string): Promise<void> {
    return Auth.forgotPassword(username);
  }


  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<string> {
    return Auth.forgotPasswordSubmit(username, code, newPassword);
  }
  clearCurrentUser()
  {
    this.currentUserInfo=null;
  }
}
