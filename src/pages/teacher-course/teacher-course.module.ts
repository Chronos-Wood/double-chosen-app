import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherCoursePage } from './teacher-course';

@NgModule({
  declarations: [
    TeacherCoursePage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherCoursePage),
  ],
})
export class TeacherWillPageModule {}
