import bcrypt from 'bcrypt';
import { venderPayload } from '../dto';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';

export const GenerateSalt = async()=>{
    return await bcrypt.genSalt(10);
}

// export const GeneratePassword = async (password:string, salt:string)=>{
//     console.log("zzzz",password, salt)
//     return await bcrypt.hash(password, salt)
// }

export const GeneratePassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt);

}

export const validatePassword = async (enterPassword:string, savePassword:string, salt:string)=>{
    console.log("yyyy",enterPassword,savePassword, salt)
    return await GeneratePassword(enterPassword, salt) === savePassword;
}

export const GenerateSignature = (payload:venderPayload)=>{

    return jwt.sign(payload, APP_SECRET, {expiresIn:'1d'});

}

export const validateSignature = (req:Request)=>{
    const signature = req.get('Authorization');
    if(signature){
        const payload = jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;
        req.user = payload;
        return true;
    }
    return false;
}