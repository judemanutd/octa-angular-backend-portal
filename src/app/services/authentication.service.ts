import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user: User;

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

  public saveUserToStorage = (user: User) => {
    let token: string;
    const ssd = user.getIdToken().then(data => {
      token = data;
      localStorage.setItem('user', token);
    });
    console.log('TCL: AuthenticationService -> publicsaveUserToStorage -> data', ssd);
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
