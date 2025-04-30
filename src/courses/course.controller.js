import { response, request } from "express";
import Course from "./course.model.js";

export const postCourse = async (req, res) => {
    try {
        const data = req.body;

        const course = new Course(data);

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course saved successfully!',
            course
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving course!',
            error
        })
    }
}

export const getCourses = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            courses
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting courses!',
            error
        })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course not found!'
            })
        }

        res.status(200).json({
            success: true,
            course
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting course!',
            error
        })
    }
}

export const getCourseByName = async (req, res) => {
    try {
        const { name } = req.params;

        const course = await Course.findOne({ name });

        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course not found!'
            });
        }

        res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting course!',
            error: error.message
        });
    }
};

export const putCourse = async (req, res = response) => {
    try {

        const { id } = req.params;
        const data = req.body;

        const course = await Course.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Course update!',
            course
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error update!',
            error
        })
    }
}

export const deleteCourse = async (req, res) => {
    try {

        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(id, { status: false }, { new: true });


        res.status(200).json({
            success: true,
            msg: 'Deactivate course!',
            course,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Deactivate error!',
            error
        })
    }
}