export interface Roles { 
    user?: boolean;
    admin?: boolean;
 }
export class User {
    uid: string;
    email: string;
    roles: Roles;

  //   constructor(authData) {
  //   this.email    = authData.email
  //   this.roles    = { admin: true }
  // }
}
