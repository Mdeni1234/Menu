export interface Roles { 
    user?: boolean;
    admin?: boolean;
 }
export class User {
    uid: string;
    email: string;
    roles: Roles;
}
