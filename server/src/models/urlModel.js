import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    longUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortUrl: {
        type: String,
        required: true,
        trim: true
    }
}, {versionKey: false})

const Url = mongoose.model('Url', urlSchema);

export default Url;