export interface Roles {
    client?: boolean;
    worker?: boolean;
    admin?: boolean;
}
export interface Houses {
    owner: string;
    hid: string;
    name: string;
    address: string;
    postcode: number;
    city: string;
    size: number;
    numRoom: number;
    numBath: number;
    numKitchen: number;
    numGarden: number;
    numLiving: number;
    numDining: number;
    numGarage: number;
}
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified?: boolean;
    roles: Roles;
}
export interface Cleaning {
    cid: string;
    clientid: string;
    name: string;
    notes:string;
    workerid:string;
    start: Date;
    end: Date;
}
