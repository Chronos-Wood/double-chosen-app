import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WillProvider } from '../../providers/will/WillService';
import { observable } from 'rxjs/symbol/observable';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WillResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-will-result',
  templateUrl: 'will-result.html',
})
export class WillResultPage {

  pageIndex = 0;
  pageSize = 10;
  resData = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public willService: WillProvider) {
  }

  ionViewDidLoad() {
    this.willService.fetchResult(this.pageIndex, this.pageSize)
        .then(observable => {
          observable.subscribe(result => {
            if (result.status === 10000) {
              this.resData = result.data;
            }
          })
        })
  }
}
