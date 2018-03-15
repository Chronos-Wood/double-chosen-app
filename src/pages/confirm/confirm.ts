import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
   selectedCourses: Array<Course>;
   constructor(public navCtrl: NavController,
     public navParams: NavParams) {
   	this.selectedCourses = [];
  }

  ionViewDidLoad() {
    this.selectedCourses = this.navParams.get('selected')
  }

  sort (course, index) {
  	if (index > 0) {
  		let tmp = this.selectedCourses[index - 1];
  		this.selectedCourses[index - 1] = this.selectedCourses[index];
  		this.selectedCourses[index] = tmp;
  	}
  }

}