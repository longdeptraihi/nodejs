import mongoose from 'mongoose';
const { ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:32
    },
    description:{
        type: String,
        required: true,
        maxlength:2000,
        trim: true
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: ObjectId,
        ref:"Category",
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    quantity:{
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    shipping: {
        type: Boolean
    }
}, { timestamps: true})

module.exports = mongoose.model("Product", productSchema);