import {Courseopt} from './Courseopt'

export class Courses extends Courseopt{
  id: number;
	name: string;
	teacher: string;
	description: string;
	period: string;
  previewIamge: string;
  directorId: string;
  periodId: string;
  director:any;

	constructor() {
		super();
	}
}
