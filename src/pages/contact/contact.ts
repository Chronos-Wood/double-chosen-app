import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info'
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  userName: string;

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get("account")
        .then(account => this.userName = account.userName)
  }

  info() {
  	this.navCtrl.push(InfoPage);
  }

}
