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
import {SignupForm} from "../../models/signupForm";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  salt: string;
  user: any;

  constructor(public http: HttpClient, private storage: Storage) {
    this.salt = "hasodifhsoifhosidfh";
    this.storage.get("account")
      .then(user => this.user = user)
  }

  loginAndCache(user: SigninForm): Observable<Result> {

    if (user.password) {
      user.password = Md5.hashStr(this.salt + user.password).toString();
    }
    const body = Api.transform(user);
    return this.http
      .post<Result>(Api.signin, body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Role': '1', 'UserName': '1',}),
        observe: 'response',
      })
      .pipe(tap((result) => this.handleResponse(result)))
      .map((result) => result.body)
  }

  signup(user: SignupForm): Observable<Result> {
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
      .post<Result>(Api.signup, body, {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
  }

  updateUser(subject, infoStr) : Observable<Result> {
    let role = this.user.role;
    let url = Api.getUpdate(role);
    let data = {};
    const body = Api.transform(data[subject] = infoStr);
    return this.http
      .post<Result>(url, body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','tk': this.user.token})
      })
  }

  getInfo() {
    let role = this.user.role;
    let token = this.user.token;
    let username = this.user.userName;
    let url = Api.getDetail(role);
    const body = Api.transform({userName: username});
    return this.http
      .post<Result>(url, body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': token})
      })
  }

  private handleResponse(result) {
    let data;
    let body = result.body;
    if (body && body.status === 10000) {
      this.storage.set("account", body.data);
    }
  }

}