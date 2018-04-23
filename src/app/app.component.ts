import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs_student/tabs';
import { Storage } from '@ionic/storage';
import {TabsTeacherPage} from "../pages/tabs-teacher/tabs-teacher";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.storage.get('account').then(account => {
      if (account && account.token) {
        if (account.role === 0) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TabsTeacherPage;
        }
      } else {
        this.rootPage = LoginPage;
      }
    });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
