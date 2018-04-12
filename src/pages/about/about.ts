import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {TeacherProvider} from "../../providers/teacher/TeacherService";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs/Observable";
import {Result} from "../../models/Result";
import {DetailPage} from "../detail/detail";
import {UserProvider} from "../../providers/user/UserService";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  pageIndex: number = 0;
  pageSize: number = 10;
  role: number;
  studentList: any;
  map: Map<string, Array<any>> = new Map();

  constructor(public navCtrl: NavController,
              private teacherService: TeacherProvider,
              private studentService: UserProvider,
              private storage: Storage) {
    this.studentList = []

  }

  ionViewDidLoad() {

    this.storage.get("account").then(account => {
      this.role = account.role;
      if (this.role === 0) {
        this.teacherService.getTeacherList(this.pageIndex, this.pageSize)
          .then((observable: Observable<Map<string, Array<any>>>) => {
            observable.subscribe(map => {
              this.map = map;
            })
          });
      } else {
        this.studentService.listStudent(this.pageIndex, this.pageSize)
          .then((observable: Observable<Result<any>>) => {
            observable.subscribe(result => {
              if (result.status === 10000) {
                this.studentList = result.data;
              }
            })
          })
      }
    })
  }

  doRefresh(refresher) {
    let pageIndex = this.pageIndex += 10;
    let pageSize = this.pageSize += 10;
    this.teacherService.getTeacherList(pageIndex, pageSize)
      .then((observable: Observable<Map<string, Array<any>>>) => {
        observable.subscribe((map: Map<string, Array<any>>) => {
          map.forEach((value: Array<any>, key: string) => {
            if (this.map.has(key)) {
              this.map.get(key).push(...value);
            } else {
              this.map.set(key, value);
            }
          });
        });
        refresher.complete();
      })
  }

  doPulling(refresher: Refresher) {
    console.log('DOPULLING', refresher.progress);
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  detail(value) {
    value.role = this.role;
    this.navCtrl.push(DetailPage, value);
  }

}
