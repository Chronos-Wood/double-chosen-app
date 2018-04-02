import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {SignupForm} from '../../models/SignupForm';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProvider} from "../../providers/user/UserService";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user: SignupForm;
  signupForm: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserProvider,
              public alertCtrl: AlertController) {
    this.user = new SignupForm();
    this.signupForm = new FormGroup({
      'userName': new FormControl(this.user.userName, [
        Validators.required,
        Validators.maxLength(11)
      ]),
      'password': new FormControl(this.user.password, Validators.required),
      'repassword': new FormControl(this.user.repassword, Validators.required),
      'name': new FormControl(this.user.name, [Validators.required, Validators.maxLength(10)]),
      'sex': new FormControl(this.user.sex, Validators.required),
      'role': new FormControl(this.user.role, Validators.required),
      'college':new FormControl(this.user.college, Validators.required),
      'title':new FormControl(this.user.title, Validators.required),
    });
  }


  get userName() {
    return this.signupForm.get('userName');
  }

  get password() {
    return this.signupForm.get('password');
  }
  get repassword() {
    return this.signupForm.get('repassword');
  }
  get name() {
    return this.signupForm.get('name');
  }
  get sex() {
    return this.signupForm.get('sex');
  }

  get role() {
    return this.signupForm.get('role');
  }
  get college() {
    return this.signupForm.get('college');
  }
  get title() {
    return this.signupForm.get('title');
  }
  signup() {
    this.userService.signup(this.user)
        .subscribe((result) => {
          if (result.status === 10000) {
            this.showAlert("注册成功");
            this.navCtrl.pop();
          } else {
            this.showAlert("注册失败", result.msg);
          }
        })
  }

  showAlert(title, message ="请等待管理员通过审核") {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
