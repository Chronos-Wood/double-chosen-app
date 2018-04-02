import { Injectable } from '@angular/core';
import { Courses } from '../../models/Courses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class CourseService {
	courses: Array<Courses>;
    constructor(public http: HttpClient) {

    }

    listCourses (): Observable<Courses[]> {


    	if (this.courses) {
    		return Observable.of(this.courses);
    	} else {
    		return this.http.get('assets/data/data.json')
    		    .map((item: any) => {
    		    	this.courses = item.courses;
    		    	return item.courses;
    		    });
    	}
    }
}
