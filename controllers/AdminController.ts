import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vender } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";


export const FindVendor = async (id: String | undefined, email?: string) => {

    if(email){
        return await Vender.findOne({ email: email})
    }else{
        return await Vender.findById(id);
    }

}

export const CreateVander = async (req:Request, res:Response, next:NextFunction)=>{
    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVandorInput>req.body;
    
    const existingVander = await FindVendor('', email);
    if(existingVander!==null){
        return res.json({message:'A vender is exist with this mail id'})
    }

    // generate the salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password,salt)
    // encrypt the password

    const createVander = await Vender.create({
       name,
       address,
       pincode,
       foodType,
       email,
       password:userPassword,
       ownerName,
       phone,
       salt:10,
       serviceAvailable:false,
       coverImages:[],
       rating:0,
       foods:[]
    })
    return res.json(createVander)
} 
export const GetVander = async (req:Request, res:Response, next:NextFunction)=>{
    const vendors = await Vender.find();
    if(vendors !== null){
        return res.json(vendors)
    }
    return res.json({"message":"vendor does not available"})
} 
export const GetVanderById = async (req:Request, res:Response, next:NextFunction)=>{
    const venderId = req.params.id;
    console.log("ccc",venderId)
    const vendor = await FindVendor(venderId);
    if(vendor!==null){
        return res.json(vendor)
    }
    return res.json({"message":"vendor does not exist with this id"})
} 