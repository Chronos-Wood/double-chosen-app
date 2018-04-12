import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import { InfoPage } from '../info/info'
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  userName: string;
  role: string;

  constructor(public navCtrl: NavController, private storage: Storage, private events: Events) {
  }

  ionViewDidLoad() {
    this.storage.get("account")
        .then(account => {
          this.userName = account.userName;
          this.role = account.role;
        })
  }

  info(action) {
  	this.navCtrl.push(InfoPage, {
  	  userName: this.userName,
      role: this.role,
      action: action
    });
  }

  logout() {
    this.storage.remove('account');
    this.events.publish('user:logout');
  }

}
