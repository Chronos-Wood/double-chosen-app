export class Api{
	static base: string = 'http://139.199.34.188/double_choose';
	static student: string = 'http://139.199.34.188/double_choose/api/user/student';
	static teacher: string = 'http://139.199.34.188/double_choose/api/user/teacher';
	static project: string = 'http://139.199.34.188/double_choose/api/project';
  static will: string = 'http://139.199.34.188/double_choose/api/will';
  static result: string = 'http://139.199.34.188/double_choose/api/user/result';
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

  static getList(role) {
    if (role === 0) {
      return this.teacher + '/list'
    } else if(role === 1) {
      return this.student + '/list'
    }
  }
  static getProjects(){
	  return this.project + '/list';
  }
  static getProjectsByUserName(username){
    return this.project + '/list/' + username;
  }

  static submitWill() {
	  return this.will + '/choose';
  }
  static getWillList(role) {
    if (role === 0) {
      return this.will + '/list/student';
    } else {
      return this.will + '/list/director';
    }

  }
  static accept() {
	  return this.will + '/accept';
  }
  static getWillResult() {
    return this.result + '/result';
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
