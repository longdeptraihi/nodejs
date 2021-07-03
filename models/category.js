import  mongoose from 'mongoose';
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32
    }

}, { timestamps: true});

module.exports = mongoose.model("Category", categorySchema);