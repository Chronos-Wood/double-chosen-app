import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import { CourseService } from '../../providers/course/CourseService';
import {Courses} from '../../models/Courses';
import { AlertController } from 'ionic-angular';

import { ConfirmPage } from '../confirm/confirm'
import {Observable} from "rxjs/Observable";
import {Result} from "../../models/Result";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	courses: Array<Courses>;
	selectedCourses: Array<Courses>;
	selected: number;
	pageIndex:number = 0;
	pageSize: number = 10;
    constructor(public navCtrl: NavController,
    	          public alertCtrl: AlertController,
    	          public courseService: CourseService,
                public events: Events) {
    	this.courses = [];
    	this.selectedCourses = [];
    	this.selected = 0;
    	this.events.subscribe("course_submit:success", ()=> {
    	  this.clear();
      })
    }
    ionViewDidLoad() {
    	this.courseService.listCourses(this.pageIndex, this.pageSize)
          .then((observable: Observable<Result<Courses[]>>) => {
            observable.subscribe(result => {
              if (result.status === 10000) {
                this.courses = result.data
              }
            });
          })

    }
    onChecked (course) {
      if (course.isToggled) {
        this.selected += 1;
        this.selectedCourses.push(course);
      } else {
        this.selected -= 1;
        this.selectedCourses = this.selectedCourses
          .filter(item => item.id !== course.id)
      }
    	this.checkMaxSelected();
    }

    checkMaxSelected () {
    	if (this.selected === 3) {
    		//最大选择三个
    		for (let course of this.courses) {
    			if (!course.isToggled) {
    				course.disabled = true;

    			}
    		}
    	}else {
    		//取消任何一个将已禁用的toggle开启
    		this.courses
    		    .filter(course => course.disabled === true)
    		    .forEach(course => course.disabled = false)
    	}
    }
    clear() {
      this.courses
        .filter(course => {
          if (course.disabled) {
            course.disabled = false;
          }
          course.isToggled = false;
        })
    }
    confirm () {
    	if (this.selected < 3) {
    	let alert = this.alertCtrl.create({
           title: '确认选择',
           subTitle: `你最多可以选择3个志愿，当前${this.selected}个，确认继续吗？` ,
           buttons: [
           {
          text: '返回',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            this.navCtrl.push(ConfirmPage, {
            	selected: this.selectedCourses
            });
          }
        }
      ]
         });
         alert.present();
         return;
    	}
    	this.navCtrl.push(ConfirmPage, {
            selected: this.selectedCourses
        });

    }

}
