import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {WillProvider} from "../../providers/will/WillService";
import {Observable} from "rxjs/Observable";
import {Result} from "../../models/Result";

/**
 * Generated class for the TeacherWillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-will',
  templateUrl: 'teacher-will.html',
})
export class TeacherWillPage {

  pageIndex = 0;
  pageSize = 10;
  list: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private willService: WillProvider, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.willService.listTeacherWill(this.pageIndex, this.pageSize, this.navParams.data.id)
      .then((obervable: Observable<Result<any>>)=> {
        obervable.subscribe(result => {
          if (result.status === 10000) {
            this.list = result.data;
          }
        })
      })
  }

  doInfinite() {
    console.log('dodododo')
  }


  selectChange(index, num) {
    let student = this.list[index][num];

    console.log(student)
  }

  submit() {
    let final = [];
    this.list.forEach(item => {
      item.forEach(student => {
        if (student.isChecked) {
          final.push(student.id);
        }
      })
    });
    if (final.length <= 0) return;
    this.willService.acceptWill(final)
      .then((obervable: Observable<Result<any>>)=> {
        obervable.subscribe(result => {
          if (result.status === 10000) {
            this.ionViewDidLoad();
            this.showAlert("选择成功");
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
