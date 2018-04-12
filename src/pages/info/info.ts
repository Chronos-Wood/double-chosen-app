import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { EditPage } from '../edit/edit'
import { UserProvider } from "../../providers/user/UserService";
import { Storage } from "@ionic/storage";
import {LoginPage} from "../login/login";
import { Events } from 'ionic-angular';

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

  title: string;
  name: string;
  sex: string;
  introduction: string;
  interest: string;
  action: string;
  awards: string;
  researchDirection: string;
  infoStr:string;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
    public userService: UserProvider,
    public storage: Storage,
    private events: Events) {
  }

  ionViewDidLoad() {
    this.action = this.navParams.data.action;
    this.userService.getInfo().then(observable => {
      observable.subscribe((result)=> {
        if (result.status === 10000) {
          let user = result.data;
          if (this.action === 'introduction') {
            this.name = user.name;
            this.sex = user.gender == 0? '男' : '女';
            this.title = '个人简介';
            this.infoStr = this.introduction = user.introduction || '这个人很懒，什么也没有留下';
          } else if(this.action === 'interest') {
            this.infoStr = this.interest = user.interest || '这个人很懒，什么也没有留下';
            this.title = '兴趣爱好'
          }  else if(this.action === 'awards') {
            this.infoStr = this.awards = user.awards  || '这个人很懒，什么也没有留下';
            this.title = '获奖情况';
          } else if (this.action === 'researchDirection') {
            this.infoStr = this.researchDirection = user.researchDirection || '这个人很懒，什么也没有留下';
            this.title = '研究方向';
          }
        } else if(result.status === 500101) {
          this.storage.remove('account');
          this.events.publish('user:logout');
        }
      })
    })
  }

  edit() {
  	let modal = this.modalCtrl.create(EditPage, {
      infoStr: this.infoStr,
      title: this.title,
      subject: this.action,
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
