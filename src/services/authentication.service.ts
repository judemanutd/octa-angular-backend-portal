import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      // Subscriber which is called when the value changes ( successfully logged in)
      if (user) {
        this.user = user;
        this.saveUserToStorage(this.user);
      } else {
        this.clearUserToStorage();
      }
    });
  }

  /**
   * Sign in user, using email an password
   *
   * @param email - user email
   * @param password- user password
   */
  signInUser = async (email: string, password: string) => {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.user = res.user;
      await this.router.navigate(['/dashboard']);
      return res.user;
    } catch (err) {
      console.log('Auth Service Something is wrong:', err.message);
      throw err;
    }
  };

  public isAuthenticated = (): boolean => {
    // TODO: proper token expiry based auth
    return !!this.fetchUserToStorage();
  };

  /**
   * Sign out logged in user
   */
  signOutUser = async () => {
    // Clear everything on logout
    await this.afAuth.auth.signOut();
    this.clearUserToStorage();
    await this.router.navigate(['login']);
  };

  private saveUserToStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  private fetchUserToStorage = (): User => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    else return (user as unknown) as User;
  };

  private clearUserToStorage = () => {
    localStorage.removeItem('user');
  };
}
