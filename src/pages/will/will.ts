import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WillProvider} from "../../providers/will/WillService";
import {observable} from "rxjs/symbol/observable";
import {Map} from "rxjs/util/Map";
import {Result} from "../../models/Result";

/**
 * Generated class for the WillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-will',
  templateUrl: 'will.html',
})
export class WillPage {

  willMap: Map<number, any[]>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public willService: WillProvider) {
    this.willMap = new Map();
  }

  ionViewDidLoad() {
    this.willService.listStudentWill()
      .then(observable => {
        observable.subscribe((result: Result<Map<number, any[]>>) => {
         if (result.status === 10000) {
           this.willMap = result.data;
         }
        })
      });
  }

  getKeys(map: Map<number, any[]>) {
    return Array.from(map.keys());
  }

}
