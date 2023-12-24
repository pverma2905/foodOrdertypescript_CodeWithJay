import mongoose, {Schema, Document, Model} from 'mongoose';

interface FoodDoc extends Document{
    venderId:string;
    name:string;
    description:string;
    category:string;
    foodType:string;
    readyTime:number;
    price:number;
    rating:number;
    images:[string];
}

const FoodSchema = new Schema({
    venderId:{type:String},
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String},
    foodType:{type:String,required:true},
    readyTime:{type:String},
    price:{type:String,required:true},
    rating:{type:String},
    images:{type:[String]}
},{
    toJSON:{
        transform(doc, ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps:true
})

const Food = mongoose.model<FoodDoc>('food', FoodSchema);

export {Food};