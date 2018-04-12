import {Component} from '@angular/core';
import {AlertController, Events, NavController, NavParams} from 'ionic-angular';
import {Courses} from '../../models/Courses';
import {CourseService} from "../../providers/course/CourseService";
import {observable} from "rxjs/symbol/observable";

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
  selectedCourses: Array<Courses>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private courseService: CourseService,
              private alertCtrl: AlertController,
              public events: Events) {
    this.selectedCourses = [];
  }

  ionViewDidLoad() {
    this.selectedCourses = this.navParams.get('selected')
  }

  sort(course, index) {
    if (index > 0) {
      let tmp = this.selectedCourses[index - 1];
      this.selectedCourses[index - 1] = this.selectedCourses[index];
      this.selectedCourses[index] = tmp;
    }
  }

  confirm() {
    let will = [];
    for(let course of this.selectedCourses) {
      will.push(course.id);
    }
    this.courseService.submitWill({projectIds: will})
      .then(observable => {
        observable.subscribe(result => {
          if (result.status === 10000) {
            this.navCtrl.pop();
            this.showAlert("结果公布后方可获知选择结果");
            this.events.publish("course_submit:success")
          } else {
            this.showAlert(result.msg, false);
          }
        })
      })
  }

  showAlert(message, success = true) {
    let alert = this.alertCtrl.create({
      title: success? '提交成功': '操作失败',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
