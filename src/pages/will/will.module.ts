import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WillPage } from './will';

@NgModule({
  declarations: [
    WillPage,
  ],
  imports: [
    IonicPageModule.forChild(WillPage),
  ],
})
export class WillPageModule {}
