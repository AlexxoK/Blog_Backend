import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    author:{
        type: String,
        required: [true, "Author is required!"],
        maxLength: [100, "Max 100 characters!"]
    },

    comment: {
        type: String,
        required: [true, "Comment is required!"],
        maxLength: [5000, "Max 5000 characters!"]
    },

    publication: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Publication'
        }
    ],

    status: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model('Comment', CommentSchema);