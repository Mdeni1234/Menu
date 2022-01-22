export interface Roles { 
    kasir?: boolean;
    owner?: boolean;
 }
export class User {
    uid: string;
    gerai: boolean;
    email: string;
    roles: Roles;
}
