import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get('/',(req:Request,res:Response)=>{
    res.json({message:'Hello From Vander'});
})

export {router as VandorRoutes}