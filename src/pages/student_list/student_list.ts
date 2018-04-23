import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {TeacherProvider} from "../../providers/teacher/TeacherService";
import {Observable} from "rxjs/Observable";
import {Result} from "../../models/Result";
import {DetailPage} from "../detail/detail";
import {UserProvider} from "../../providers/user/UserService";

@Component({
  selector: 'student_list',
  templateUrl: 'student_list.html'
})
export class StudentListPage {

  pageIndex: number = 0;
  pageSize: number = 10;
  studentList: any;

  constructor(public navCtrl: NavController,
              private teacherService: TeacherProvider,
              private studentService: UserProvider) {
    this.studentList = []

  }

  ionViewDidLoad() {

    this.studentService.listStudent(this.pageIndex, this.pageSize)
      .then((observable: Observable<Result<any>>) => {
        observable.subscribe(result => {
          if (result.status === 10000) {
            this.studentList = result.data;
          }
        })
      })
  }

  doRefresh(refresher) {
    this.pageIndex += 10;
    this.pageSize += 10;
    this.studentService.listStudent(this.pageIndex, this.pageSize)
      .then((observable: Observable<Result<any>>) => {
        observable.subscribe(result => {
          if (result.status === 10000) {
            this.studentList = result.data;
            refresher.complete();
          }
        })
      })
  }


  detail(value) {
    value.role = 0;
    this.navCtrl.push(DetailPage, value);
  }

}
