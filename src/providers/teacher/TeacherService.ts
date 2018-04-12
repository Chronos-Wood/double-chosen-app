import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Result} from "../../models/Result";
import {Api} from "../../models/Api";
import {tap} from "rxjs/operators";
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";

/*
  Generated class for the TeacherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeacherProvider {

  constructor(public http: HttpClient,
              private storage: Storage,
              private events: Events) {
    console.log('Hello TeacherProvider Provider');
  }

  getTeacherList(pageIndex, pageSize): Promise<Observable<Map<string, Array<any>>>> {
    return this.storage.get('account').then(account => {
      let role = account.role;
      let token = account.token;
      let url = Api.getList(role);
      const body = Api.transform({offset: pageIndex, amount: pageSize});
      return this.http.post<Result<any>>(url, body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': token})
      })
        .map(this.handleResponse);
    })

  }

  private handleResponse(result: Result<any>): Map<string, Array<any>> {
    let map: any = new Map(),
        array;
    if (result.status === 10000) {
      let data = result.data;
      data.forEach(item => {
        if ((array = map.get(item.college)) == null) {
          let value = [];
          value.push(item);
          map.set(item.college, value);
        } else {
          array.push(item);
        }
      });
    } else if (result.status === 500101) {
      this.storage.remove('account');
      this.events.publish('user:logout');
    }
    return map;
  }
}
