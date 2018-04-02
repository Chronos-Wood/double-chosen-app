import {Courseopt} from './Courseopt'

export class Courses extends Courseopt{
	courseId: number;
	title: string;
	teacher: string;
	description: string;
	period: string;

	constructor() {
		super();
	}
}