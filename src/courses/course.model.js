import { Schema, model } from "mongoose";

const CourseSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        maxLength: 300,
    },

    status: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model('Course', CourseSchema);