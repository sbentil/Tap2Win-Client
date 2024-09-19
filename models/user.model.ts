export enum IRoles {
    ADMIN = "admin",
    ORGANIZER = "organizer",
}

export interface IUser {
    _id: string;
    email: string;
    name:string;
    role: IRoles;
    phone: string;
    profileImageUrl?: string;
}

