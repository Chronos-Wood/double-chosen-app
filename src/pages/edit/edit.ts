import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/UserService";

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  infoStr: string;
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userService: UserProvider) {
  }

  ionViewDidLoad() {
    this.infoStr = this.navParams.data.infoStr;
    this.title = this.navParams.data.title;
  }

  confirm() {
    let subject = this.navParams.data.subject;
    this.userService.updateUser(subject, this.infoStr).subscribe((result) => {
      if (result && result.status === 10000) {
        this.viewCtrl.dismiss(true);
      }
    });

  }
}
