import mongoose from "mongoose";


const menuschema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    size:{
        type:String,
        required: false
    },
    image:{
        type:String,
        required:false,
        default: " "
    }
}, {timestamps: true})

const mealschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    items:{
        type:String,
        required:true,
    },
    price:{
        type:Number
    },
    image:{
        type:String
    }
}, {timestamps:true})

const Menu = new mongoose.model("Menu", menuschema)
const Meal = new mongoose.model("Meal", mealschema)

export {Menu, Meal}