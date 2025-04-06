import mongoose from 'mongoose'


const BlogSchema = new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


const Blog = mongoose.model("Blog", BlogSchema)

export {Blog}