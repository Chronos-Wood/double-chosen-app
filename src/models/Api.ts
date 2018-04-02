export class Api{
	static base: string = 'http://localhost:8888';
	static student: string = 'http://localhost:8888/api/user/student';
	static teacher: string = 'http://localhost:8888/api/user/teacher';
	static signin: string = Api.base + '/api/user/signin';
  static signup: string = Api.base + '/api/user/signup';

	constructor() {

	}
	static getUpdate(role) {
	  if (role === 0) {
	    return this.student + '/update'
    } else if(role === 1) {
      return this.teacher + '/update'
    }
  }
  static getDetail(role) {
    if (role === 0) {
      return this.student + '/detail'
    } else if(role === 1) {
      return this.teacher + '/detail'
    }
  }

	static transform (obj: any, exclude: string = 'repassword') {
		let res = [];
		let keys = Object.keys(obj);
		for (let key of keys) {
		  if(key !== exclude)
			res.push(key + "=" + obj[key]);
		}
		return res.join('&');
	}
}
