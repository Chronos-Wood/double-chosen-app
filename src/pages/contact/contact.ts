import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info'
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  user: any;

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get("account")
        .then(user => this.user = user)
  }

  info() {
  	this.navCtrl.push(InfoPage);
  }

}
