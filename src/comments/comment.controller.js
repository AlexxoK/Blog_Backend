import { response, request } from "express";
import Comment from "./comment.model.js";
import Publication from "../publications/publication.model.js";

export const postComment = async (req, res) => {
    try {
        const data = req.body;

        // Lineas 10 y 12 sirven para poder usar nombres en vez de id's en postman
        const maping = await Publication.findOne({ title: data.publication });

        data.publication = maping._id;

        const comment = new Comment(data);

        await comment.save();

        // Haremos un poblado de varios modelos
        await comment.populate('publication', 'title').populate({ path: 'publication', populate: { path: 'course', select: 'name' }})

        res.status(200).json({
            success: true,
            message: 'Comment saved successfully!',
            comment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving comment!',
            error
        })
    }
}

export const getComments = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, comments] = await Promise.all([
            Comment.countDocuments(query),
            Comment.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('publication', 'title').populate({ path: 'publication', populate: { path: 'course', select: 'name' }})
        ])

        res.status(200).json({
            success: true,
            message: 'Comments found!',
            total,
            comments
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting comments!',
            error
        })
    }
}

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id).populate('publication', 'title').populate({ path: 'publication', populate: { path: 'course', select: 'name' }});

        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: 'Comment not found!'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Comment found!',
            comment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting comment!',
            error
        })
    }
}

export const getCommentByPublication = async (req, res) => {
    try {
        const { title } = req.params;

        const publication = await Publication.findOne({ title });

        const comments = await Comment.find({ publication: publication._id, status: true }).populate('publication', 'title').populate({ path: 'publication', populate: { path: 'course', select: 'name' }});

        res.status(200).json({
            success: true,
            message: 'Comment found!',
            comments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting comments for the publication!',
            error: error.message
        });
    }
};

export const putComment = async (req, res = response) => {
    try {

        const { id } = req.params;
        const data = req.body;

        const maping = await Publication.findOne({ title: data.publication });

        data.publication = maping._id;

        const comment = await Comment.findByIdAndUpdate(id, data, { new: true }).populate('publication', 'title').populate({ path: 'publication', populate: { path: 'course', select: 'name' }});

        res.status(200).json({
            success: true,
            msg: 'Comment update!',
            comment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error update!',
            error
        })
    }
}

export const deleteComment = async (req, res) => {
    try {

        const { id } = req.params;

        const comment = await Comment.findByIdAndUpdate(id, { status: false }, { new: true });


        res.status(200).json({
            success: true,
            msg: 'Deactivate comment!',
            comment,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Deactivate error!',
            error
        })
    }
}