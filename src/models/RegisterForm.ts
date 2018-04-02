export class RegisterForm{
  private _userName: string;
  private _role: string;
  private _password: string;
  private _repassword:string;
  private _name: string;
  private _sex:string;
  private _college;
  private _title:string;
  constructor() {

  }
  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get role(): string {
    return this._role || '0';
  }

  set role(value: string) {
    this._role = value;
  }
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get repassword(): string {
    return this._repassword;
  }

  set repassword(value: string) {
    this._repassword = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get sex(): string {
    return this._sex || '0';
  }

  set sex(value: string) {
    this._sex = value;
  }

  get college() {
    return this._college || '大气科学学院';
  }

  set college(value) {
    this._college = value;
  }

  get title(): string {
    return this._title || '副教授';
  }

  set title(value: string) {
    this._title = value;
  }
}
