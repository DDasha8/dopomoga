import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desk: {
            type: String,
            required: true,
            max: 1000,
        },
        tags: {
            type: Array,
            default: [],
        },
        comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }],
        viewsCount: {
            type: Number,
            default: 0,
        },
        img:{
            type: String,
            max: 500,
        },
        like:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
            }
        ],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        images:[
            {
                type:String
            }
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('post', PostSchema);