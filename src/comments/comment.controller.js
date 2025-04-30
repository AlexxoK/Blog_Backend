import { response, request } from "express";
import Comment from "./comment.model.js";
import Publication from "../publications/publication.model.js";

export const postComment = async (req, res) => {
    try {
        const data = req.body;

        const comment = new Comment(data);

        await comment.save();

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
        ])

        res.status(200).json({
            success: true,
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

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: 'Comment not found!'
            })
        }

        res.status(200).json({
            success: true,
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

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: 'Publication not found!'
            });
        }

        const comments = await Comment.find({ publication: publication._id, status: true });

        res.status(200).json({
            success: true,
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

        const comment = await Comment.findByIdAndUpdate(id, data, { new: true });

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