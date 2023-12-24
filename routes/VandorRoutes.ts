import { updateVenderService } from './../controllers/VendorController';
import express, { Request, Response, NextFunction } from "express";
import {getVenderProfile, updateVenderProfile, venderLogin, addFood, getFoods, UpdateVendorCoverImage} from '../controllers/VendorController';
import { Authenticate } from '../middlewares/CommonAuth';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'images')
    },
    filename:function(req, file, cb){
        // cb(null, new Date().toISOString()+'_'+file.originalname)
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname);
    }
})

const images = multer({storage:imageStorage}).array('images',10)


router.post('/login',venderLogin)

router.use(Authenticate);
router.get('/profile',getVenderProfile);
router.patch('/profile',updateVenderProfile);
router.patch('/coverimage',images,UpdateVendorCoverImage);
router.patch('/service',updateVenderService);


router.post('/food', images, addFood);
router.get('/foods', getFoods);

router.get('/',(req:Request,res:Response)=>{
    res.json({message:'Hello From Vander'});
})

export {router as VandorRoutes}