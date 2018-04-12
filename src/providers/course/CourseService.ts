import {Injectable} from '@angular/core';
import {Courses} from '../../models/Courses';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Api} from "../../models/Api";
import {Result} from "../../models/Result";
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";


@Injectable()
export class CourseService {
  courses: Array<Courses>;

  constructor(public http: HttpClient,
              private storage: Storage,
              private events: Events) {

  }

  listCourses(pageIndex, pageSize): Promise<Observable<Result<Courses[]>>> {
    return this.storage.get('account').then(account => {
      let token = account.token;
      let url = Api.getProjects();
      const body = Api.transform({offset: pageIndex, amount: pageSize});
      return this.http.post<Result<Courses[]>>(url, body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'tk': token})
      })
        .map((result: Result<Courses[]>) => {
          if (result.status === 500101) {
            this.storage.remove('account');
            this.events.publish('user:logout');
          }
          return result;
        })
    })
  }

  submitWill(selectedCourse): Promise<Observable<Result<number>>> {
    return this.storage.get('account').then(account => {
      let token = account.token;
      let username = account.userName;
      let role = account.role;
      let url = Api.submitWill();
      selectedCourse.accountVO = {
        role: role,
        userName: username
      };
      return this.http.post<Result<number>>(url, selectedCourse, {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'tk': token})
      })
        .map((result: Result<number>) => {
          if (result.status === 500101) {
            this.storage.remove('account');
            this.events.publish('user:logout');
          }
          return result;
        })
    })
  }
}
