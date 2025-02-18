import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-login',
  templateUrl: './quick-login.component.html',
  styleUrls: ['./quick-login.component.scss']
})
export class QuickLoginComponent {
  @Input() visible: boolean = false;
  @Input() responseMessage: string = '';
  @Input() responseType: 'success' | 'error' | undefined;
  

  @Output() loginData = new EventEmitter<{
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
    registerPassword: string,
    isRegistering: boolean
  }>();

  username: string = '';
  password: string = '';
  isRegistering: boolean = false;

  // Register Fields
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  registerPassword: string = '';

  // Validation tracking
  usernameTouched: boolean = false;
  passwordTouched: boolean = false;
  firstnameTouched: boolean = false;
  lastnameTouched: boolean = false;
  emailTouched: boolean = false;
  registerPasswordTouched: boolean = false;

  /**
   * Handles login submission with validation
   */
  onLogin() {
    this.usernameTouched = true;
    this.passwordTouched = true;

    if (!this.username || !this.password) {
      return; // Stop login if fields are empty
    }

    this.loginData.emit({
      username: this.username,
      password: this.password,
      firstname: '',
      lastname: '',
      email: '',
      registerPassword: '',
      isRegistering: false
    });

  }

  /**
   * Handles registration submission with validation
   */
  onRegister() {
    this.firstnameTouched = true;
    this.lastnameTouched = true;
    this.emailTouched = true;
    this.registerPasswordTouched = true;

    if (!this.firstname || !this.lastname || !this.email || !this.registerPassword || !this.isEmailValid()) {
      return; // Stop registration if fields are empty or email is invalid
    }

    this.loginData.emit({
      username: '',
      password: '',
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      registerPassword: this.registerPassword,
      isRegistering: true
    });

  }

  /**
   * Checks if email is valid
   */
  isEmailValid(): boolean {
    return this.email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  /**
   * Closes the dialog and resets the form
   */
  cancel() {
    this.closeDialog();
  }

  /**
   * Resets form and validation tracking
   */
  private closeDialog() {
    this.visible = false;
    this.isRegistering = false;

    // Reset fields
    this.username = '';
    this.password = '';
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.registerPassword = '';

    // Reset validation states
    this.usernameTouched = false;
    this.passwordTouched = false;
    this.firstnameTouched = false;
    this.lastnameTouched = false;
    this.emailTouched = false;
    this.registerPasswordTouched = false;
  }
}
