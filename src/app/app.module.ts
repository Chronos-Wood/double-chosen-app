import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {StudentListPage} from '../pages/student_list/student_list';
import {TeacherListPage} from '../pages/teacher_list/teacher_list';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ConfirmPage } from '../pages/confirm/confirm';
import { TabsPage } from '../pages/tabs_student/tabs';
import { LoginPage } from '../pages/login/login'
import { SignupPage } from '../pages/signup/signup'
import { InfoPage } from '../pages/info/info'
import { EditPage } from '../pages/edit/edit'
import {DetailPage} from "../pages/detail/detail"
import {WillPage} from "../pages/will/will";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule }    from '@angular/common/http';
import { CourseService } from '../providers/course/CourseService'
import { UserProvider } from '../providers/user/UserService';
import { TeacherProvider } from '../providers/teacher/TeacherService';
import { WillProvider } from '../providers/will/WillService';
import {TabsTeacherPage} from "../pages/tabs-teacher/tabs-teacher";
import {TeacherCoursePage} from "../pages/teacher-course/teacher-course";
import { TeacherWillPage } from "../pages/teacher-will/teacher-will";

@NgModule({
  declarations: [
    MyApp,
    StudentListPage,
    TeacherListPage,
    ContactPage,
    HomePage,
    TabsPage,
    ConfirmPage,
    LoginPage,
    InfoPage,
    EditPage,
    SignupPage,
    DetailPage,
    WillPage,
    TabsTeacherPage,
    TeacherCoursePage,
    TeacherWillPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StudentListPage,
    TeacherListPage,
    ContactPage,
    HomePage,
    TabsPage,
    ConfirmPage,
    LoginPage,
    InfoPage,
    EditPage,
    SignupPage,
    DetailPage,
    WillPage,
    TabsTeacherPage,
    TeacherCoursePage,
    TeacherWillPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CourseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    TeacherProvider,
    WillProvider
  ]
})
export class AppModule {}
