import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Result} from "../../models/Result";
import {Observable} from "rxjs/Observable";
import {Courses} from "../../models/Courses";
import {CourseService} from "../../providers/course/CourseService";
import {TeacherWillPage} from "../teacher-will/teacher-will";

/**
 * Generated class for the TeacherWillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-course',
  templateUrl: 'teacher-course.html',
})
export class TeacherCoursePage {
  pageIndex:number = 0;
  pageSize: number = 10;

  courses: Array<Courses>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public courseService: CourseService) {
    this.courses = [];
  }

  ionViewDidLoad() {
    this.courseService.listCoursesByDirector(this.pageIndex, this.pageSize)
      .then((observable: Observable<Result<Courses[]>>) => {
        observable.subscribe(result => {
          if (result.status === 10000) {
            this.courses = result.data
          }
        });
      })
  }


  acceptWill(course) {
    this.navCtrl.push(TeacherWillPage, course);
  }

  doInfinite(infiniteScroll) {
    this.pageIndex+=10;
    this.pageSize+=10;
    this.courseService.listCoursesByDirector(this.pageIndex, this.pageSize)
      .then((observable: Observable<Result<Courses[]>>) => {
        observable.subscribe(result => {
          infiniteScroll.complete();
          if (result.status === 10000) {
            this.courses.push(...result.data)
          }
        });
      });

  }

}
