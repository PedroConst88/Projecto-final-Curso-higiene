export interface Roles {
    client?: boolean;
    worker?: boolean;
    admin?: boolean;
}
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified?: boolean;
    roles: Roles;
}
