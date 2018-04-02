import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProvider} from "../../providers/user/UserService";
import {RegisterForm} from "../../models/RegisterForm";

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
  user: RegisterForm;
  form: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserProvider,
              public alertCtrl: AlertController) {
    this.user = new RegisterForm();
    this.form = new FormGroup({
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
    return this.form.get('userName');
  }

  get password() {
    return this.form.get('password');
  }
  get repassword() {
    return this.form.get('repassword');
  }
  get name() {
    return this.form.get('name');
  }
  get sex() {
    return this.form.get('sex');
  }

  get role() {
    return this.form.get('role');
  }
  get college() {
    return this.form.get('college');
  }
  get title() {
    return this.form.get('title');
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
