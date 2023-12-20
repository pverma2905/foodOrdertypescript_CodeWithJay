import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vander } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVander = async (req:Request, res:Response, next:NextFunction)=>{
    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVandorInput>req.body;
    
    const existingVander = await Vander.findOne({email})
    if(existingVander!==null){
        return res.json({message:'A vender is exist with this mail id'})
    }

    // generate the salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password,salt)
    // encrypt the password

    const createVander = await Vander.create({
       name,
       address,
       pincode,
       foodType,
       email,
       password:userPassword,
       ownerName,
       phone,
       salt:'xkgz9yO7geA3YXcPt.xr=O@',
       serviceAvailable:false,
       coverImages:[],
       rating:0,
    })
    return res.json(createVander)
} 
export const GetVander = async (req:Request, res:Response, next:NextFunction)=>{
    
    
} 
export const GetVanderById = async (req:Request, res:Response, next:NextFunction)=>{

} 