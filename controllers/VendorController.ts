import { Request, Response, NextFunction } from "express";
import { Food, Vender } from "../models";
import { EditVenderInputs, VendorLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, validatePassword } from "../utility";
import bcrypt from 'bcrypt';
import { CreateFoodInputs } from "../dto/Food.dto";

export const venderLogin = async (req:Request, res:Response, next:NextFunction)=>{
    const {email, password} = <VendorLoginInputs>req.body;
    const existingVender = await FindVendor('', email);
    console.log("xxxxx",existingVender)
    if(existingVender !==null){
       const validation = await bcrypt.compareSync(password, existingVender.password);
       if(validation){
         const signature = GenerateSignature({
            _id:existingVender.id,
            email:existingVender.email,
            foodTypes:existingVender.foodType,
            name:existingVender.name
         })
          return res.json(signature)    
       }else{
        return res.json({"message":"password is not valid"})    
       }
    }
    return res.json({"message":"Login Details are not valid"})
} 

export const getVenderProfile = async (req:Request, res:Response, next:NextFunction)=>{
     const user = req.user;
     if(user){
      const existingVender = await FindVendor(user._id);
      return res.json(existingVender);
     }
     return res.json({"message":"Vender Information Not Found"})
}
export const updateVenderProfile = async (req:Request, res:Response, next:NextFunction)=>{
   const {foodTypes,name,address,phone} = <EditVenderInputs>req.body;
   const user = req.user;
   if(user){
    const existingVender = await FindVendor(user._id);
    if(existingVender!==null){
      existingVender.name=name;
      existingVender.address=address;
      existingVender.phone=phone;
      existingVender.foodType=foodTypes;
      const saveResult = await existingVender.save()
      return res.json(saveResult)
    }
    return res.json(existingVender);
   }
   return res.json({"message":"Vender Information Not Found"})
}


export const updateVenderService = async (req:Request, res:Response, next:NextFunction)=>{
   const user = req.user;
   if(user){
    const existingVender = await FindVendor(user._id);
    if(existingVender!==null){
      existingVender.serviceAvailable = !existingVender.serviceAvailable
      const saveResult = await existingVender.save();
      return res.json(saveResult);
    }
    return res.json(existingVender);
   }
   return res.json({"message":"Vender Information Not Found"})
}

export const addFood = async (req:Request, res:Response, next:NextFunction)=>{
   const user = req.user;
   if(user){
     const {name, description, category,foodType, readyTime, price} = <CreateFoodInputs>req.body;
     const vender = await FindVendor(user._id);
     if(vender!==null){
       const files = req.files as [Express.Multer.File]
       const images = files.map((file:Express.Multer.File)=>file.filename);
       console.log("xxxx",images)
       const createdFood = await Food.create({
         venderId: vender._id,
         name:name,
         description:description,
         category:category,
         foodType:foodType,
         images:images,
         readyTime:readyTime,
         price:price,
         rating:0 
       })
       vender.foods.push(createdFood);
       const result = await vender.save();
       return res.json(result);
     }
   }
   return res.json({"message":"something went wrong with add food"})
}

export const getFoods = async (req:Request, res:Response, next:NextFunction)=>{
   const user = req.user;
   if(user){
      const foods = await Food.find({venderId:user._id});
      if(foods!==null){
          return res.json(foods);
      }
   }
   return res.json({"message":"something went wrong with add food"})
}

export const UpdateVendorCoverImage = async (req: Request,res: Response, next: NextFunction) => {
   const user = req.user;
   if(user){
      const vendor = await FindVendor(user._id);
         if(vendor !== null){
            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename);
            vendor.coverImages.push(...images);
            const saveResult = await vendor.save();
            return res.json(saveResult);
      }
   }
   return res.json({'message': 'Unable to Update vendor profile '})

}

