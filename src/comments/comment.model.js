import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    comment: {
        type: String,
        required: [true, "Comment is required!"],
        maxLength: 5000,
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