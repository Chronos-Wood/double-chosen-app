import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Events} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {Api} from "../../models/Api";
import {Result} from "../../models/Result";
import {Courses} from "../../models/Courses";
import {Observable} from "rxjs/Observable";
import {Map} from "rxjs/util/Map";

/*
  Generated class for the WillProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WillProvider {

  constructor(public http: HttpClient,
              private storage: Storage,
              private events: Events) {
    console.log('Hello WillProvider Provider');
  }


  listStudentWill(): Promise<Observable<Result<Map<number, any[]>>>> {
    let map = new Map();
    return this.storage.get("account")
      .then(account => {
        let token = account.token;
        let username = account.userName;
        let url = Api.getWillList(account.role);
        let body = Api.transform({userName: username});
        return this.http.post<Result<Map<number, any[]>>>(url, body, {
          headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': token})
        })
          .map((result: Result<any>) => {
            if (result.status === 500101) {
              this.storage.remove('account');
              this.events.publish('user:logout');
              return;
            }
            if (result.status === 10000) {
              let keys = Object.keys(result.data);
              keys.forEach(key => {
                map.set(key, result.data[key])
              });
              result.data = map;
            }
            return result;
          })
      })
  }

  listTeacherWill(pageIndex, pageSize, projectId): Promise<Observable<Result<any>>> {
    let map = new Map();
    let res = [[], [], []];
    return this.storage.get("account")
      .then(account => {
        let token = account.token;
        let username = account.userName;
        let url = Api.getWillList(account.role);
        let body = Api.transform({userName: username, projectId: projectId, offset: pageIndex, amount: pageSize});
        return this.http.post<Result<Map<number, any[]>>>(url, body, {
          headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': token})
        })
          .map((result: Result<any>) => {
            if (result.status === 500101) {
              this.storage.remove('account');
              this.events.publish('user:logout');
              return;
            }
            if (result.status === 10000) {
              result.data.forEach(item => {
                if (item.will && item.student) {
                  item.student.isChecked = false;
                  res[item.will.precedence - 1].push(item.student);
                }
              });
              result.data = res;
            }
            return result;
          })
      })
  }

  acceptWill(willIds) : Promise<Observable<Result<any>>>{
    return this.storage.get("account")
      .then(account => {
        let username = account.userName;
        let token = account.token;
        let role = account.role;
        let url = Api.accept();
        const body = {
          willIds: willIds,
          accountVO: {
            userName: username,
            role: role
          },
        };
        return this.http.post<Result<any>>(url, body, {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'tk': token})
        })
          .map(result => {
            if (result.status === 500101) {
              this.storage.remove('account');
              this.events.publish('user:logout');
              return;
            }
            return result;
          })
      })
  }

}
