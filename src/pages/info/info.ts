import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { EditPage } from '../edit/edit'
import { UserProvider } from "../../providers/user/UserService";
import { Storage } from "@ionic/storage";
import {observable} from "rxjs/symbol/observable";

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  name: string;
  sex: string;
  introduction: string;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
    public userService: UserProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    this.userService.getInfo().then(observable => {
      observable.subscribe((result)=> {
        if (result.status === 10000) {
          let user = result.data;
          this.name = user.name;
          this.sex = user.gender == 0? '男' : '女';
          this.introduction = user.introduction || '这个人很懒，什么也没有留下';
        }
      })
    })
  }

  edit() {
  	let modal = this.modalCtrl.create(EditPage, {
      infoStr: this.introduction,
      title: '个人简介',
      subject: 'introduction',
  	});
    modal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.ionViewDidLoad();
      }
    });
    modal.present();
  }

}
