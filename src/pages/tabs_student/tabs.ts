import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Events, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {TeacherListPage} from "../teacher_list/teacher_list";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TeacherListPage;
  tab3Root = ContactPage;

  constructor(public events: Events, public navCtrl: NavController, public storage: Storage) {
    this.events.subscribe("user:logout", ()=> {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  ionViewDidLoad() {

  }
}
