export interface CreateVandorInput{
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VendorLoginInputs{
    email:string;
    password:string
}

export interface venderPayload{
    _id:string;
    email:string;
    name:string;
    foodTypes:[string];
}

export interface EditVenderInputs   {
     name:string;
     address:string;
     phone:string;
     foodTypes:[string];
}