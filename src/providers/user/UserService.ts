import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Api} from '../../models/Api';
import {SigninForm} from '../../models/SigninForm';
import {Result} from '../../models/Result';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {Md5} from 'ts-md5/dist/md5'
import {Storage} from '@ionic/storage';
import {RegisterForm} from "../../models/RegisterForm";
import {Events} from "ionic-angular";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  salt: string;
  account: any;

  constructor(public http: HttpClient,
              private storage: Storage,
              private events: Events) {
    this.salt = "hasodifhsoifhosidfh";
  }

  getCurrentUser() {
    return this.account;
  }

  loginAndCache(user: SigninForm): Observable<Result<any>> {

    if (user.password) {
      user.password = Md5.hashStr(this.salt + user.password).toString();
    }
    const body = Api.transform(user);
    return this.http
      .post<Result<any>>(Api.signin, body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Role': '1', 'UserName': '1',}),
        observe: 'response',
      })
      .pipe(tap((result) => this.handleResponse(result)))
      .map((result) => result.body)
  }

  signup(user: RegisterForm): Observable<Result<any>> {
    let data: any = {
      accountVO: {
        userName: user.userName,
        password: user.password,
        role: user.role
      }
    };
    switch (user.role) {
      case '0':
        data.studentSignUpVO = {
          studentName: user.userName,
          studentSex: user.sex
        };
        break;
      case '1':
        data.staffSignUpVO = {
          college: user.college,
          staffName: user.name,
          staffSex: user.sex,
          title: user.title
        };
        break;
      default:
    }
    if (data.accountVO.password) {
      data.accountVO.password = Md5.hashStr(this.salt + data.accountVO.password).toString();
    }
    const body = JSON.stringify(data);
    return this.http
      .post<Result<any>>(Api.signup, body, {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
  }

  updateUser(subject, infoStr): Promise<Observable<Result<any>>> {
    return this.storage.get('account').then(account => {
      let role = account.role;
      let url = Api.getUpdate(role);
      let data: any = {};
      data[subject] = infoStr;
      data.userName = account.userName;
      const body = Api.transform(data);
      return this.http
        .post<Result<any>>(url, body, {
          headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': account.token})
        })
    })
  }

  getInfo() {
    return this.storage.get('account').then(account => {
      let role = account.role;
      let token = account.token;
      let username = account.userName;
      let url = Api.getDetail(role);
      const body = Api.transform({userName: username});
      return this.http
        .post<Result<any>>(url, body, {
          headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': token})
        })
    })
  }

  listStudent(pageIndex, pageSize): Promise<Observable<Result<any>>> {
    return this.storage.get('account').then(account => {
      let role = account.role;
      let token = account.token;
      let url = Api.getList(role);
      const body = Api.transform({offset: pageIndex, amount: pageSize});
      return this.http.post<Result<any>>(url, body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': token})
      })
        .map((result: Result<any>) => {
           if(result.status === 500100) {
            this.storage.remove('account');
            this.events.publish('user:logout');
          }
          return result;
        })
    })
  }

  private handleResponse(result) {
    let body = result.body;
    if (body && body.status === 10000) {
      this.storage.set("account", body.data);
    }
  }

}
