import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { SigninForm } from '../../models/SigninForm';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/UserService';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: SigninForm;
  loginForm: any;
  constructor(public navCtrl: NavController,
    public userService: UserProvider,
    public alertCtrl: AlertController) {
    this.user = new SigninForm();
    this.user.role = '0';
    this.loginForm = new FormGroup({
        'userName': new FormControl(this.user.userName, [
              Validators.required,
              Validators.maxLength(11)
        ]),
            'password': new FormControl(this.user.password, Validators.required),
            'role': new FormControl(this.user.role, Validators.required)
      });
  }


  login () {
    this.userService.loginAndCache(this.user)
        .subscribe(res => {
          console.log(res);
          if (res.status === 10000) {
            this.navCtrl.push(TabsPage);
            this.navCtrl.setRoot(TabsPage);

          } else {
            this.user.password = '';
            this.showAlert(res.msg);
          }
        })
  }
  signup() {
     this.navCtrl.push(SignupPage);
  }

  get userName() { return this.loginForm.get('userName'); }

  get password() { return this.loginForm.get('password'); }

  get role() { return this.loginForm.get('role'); }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: '登录失败',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
