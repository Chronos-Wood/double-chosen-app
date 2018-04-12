import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Events, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;


  constructor(public events: Events, public navCtrl: NavController) {
    this.events.subscribe("user:logout", ()=> {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
