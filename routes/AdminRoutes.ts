import express, { Request, Response, NextFunction } from "express";
import { CreateVander, GetVander, GetVanderById } from "../controllers";

const router = express.Router();

router.post('/vander', CreateVander);
router.get('/vanders', GetVander);
router.get('/vander/:id', GetVanderById);


router.get('/',(req:Request,res:Response)=>{
    res.json({message:'Hello From Admin'});
})


export {router as AdminRoutes}