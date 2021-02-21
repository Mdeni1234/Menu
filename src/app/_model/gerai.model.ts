export class Gerai {
    id: string;
    namaGerai?: string;
    jamBuka?: string;
    jamTutup?: string;
    users?: {
        uid: string;
        email: string;
        roles: Roles;
    };
}
export interface Roles { 
    user?: boolean;
    admin?: boolean;
 }
