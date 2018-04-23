import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";
import {ContactPage} from "../contact/contact";
import {StudentListPage} from "../student_list/student_list";
import {TeacherCoursePage} from "../teacher-course/teacher-course";


@Component({
  templateUrl: 'tabs-teacher.html',
})
export class TabsTeacherPage {
  tab1Root = TeacherCoursePage;
  tab2Root = StudentListPage;
  tab3Root = ContactPage;

  constructor(public events: Events, public navCtrl: NavController, public storage: Storage) {
    this.events.subscribe("user:logout", ()=> {
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
