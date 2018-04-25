import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import { InfoPage } from '../info/info'
import {Storage} from "@ionic/storage";
import {WillPage} from "../will/will";
import {WillResultPage} from '../will-result/will-result';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  userName: string;
  role: string;
  label: string;

  constructor(public navCtrl: NavController, private storage: Storage, private events: Events) {
  }

  ionViewDidLoad() {
    this.storage.get("account")
        .then(account => {
          this.userName = account.userName;
          this.role = account.role;
          this.label = this.role == '0'? '学生用户':'教师用户';
        })
  }

  info(action) {
  	this.navCtrl.push(InfoPage, {
  	  userName: this.userName,
      role: this.role,
      action: action
    });
  }
  will() {
    this.navCtrl.push(WillPage);
  }
  result() {
    this.navCtrl.push(WillResultPage);
  }

  logout() {
    this.storage.remove('account');
    this.events.publish('user:logout');
  }

}
