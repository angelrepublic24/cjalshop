export class User {
    constructor(
        public name: string,
        public lname: string,
        public email: string,
        public password: string,
        public birth: Date,
        public sex: string,
        public phone: number
    ){}
}
export class LoginUser{
  constructor(
   public email: string,
   public password: string
  ){}
}
