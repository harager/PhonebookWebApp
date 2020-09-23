export class Contact {
    id:number;
    firstName: string;
    lastName: string;
    email:string;
    address:string;
    phones: [
        {
            phoneNumber:string;
            id:number;
        },
        {
            phoneNumber:string;
            id:number;
        }
    ];
    userID:number;
}
