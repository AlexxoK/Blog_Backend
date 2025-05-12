import { Schema, model } from "mongoose";

const PublicationSchema = Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        maxLength: 3000,
    },

    description: {
        type: String,
        required: [true, "Description is required!"],
        maxLength: 5000,
    },

    course: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, "Course is required!"]
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

export default model('Publication', PublicationSchema);