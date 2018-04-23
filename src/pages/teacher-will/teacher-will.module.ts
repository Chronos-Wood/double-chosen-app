import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherWillPage } from './teacher-will';

@NgModule({
  declarations: [
    TeacherWillPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherWillPage),
  ],
})
export class TeacherWillPageModule {}
