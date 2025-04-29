import { response, request } from "express";
import Publication from "./publication.model.js";

export const postPublication = async (req, res) => {
    try {
        const data = req.body;

        const publication = new Publication(data);

        await publication.save();

        res.status(200).json({
            success: true,
            message: 'Publication saved successfully!',
            publication
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving publication!',
            error
        })
    }
}

export const getPublications = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            publications
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting publications!',
            error
        })
    }
}

export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: 'Publication not found!'
            })
        }

        res.status(200).json({
            success: true,
            publication
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting publication!',
            error
        })
    }
}

export const getPublicationByTitle = async (req, res) => {
    try {
        const { title } = req.params;

        const publication = await Publication.findOne({ title });

        if (!publication) {
            return res.status(404).json({
                success: false,
                msg: 'Publication not found!'
            });
        }

        res.status(200).json({
            success: true,
            publication
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting publication!',
            error: error.message
        });
    }
};

export const putPublication = async (req, res = response) => {
    try {

        const { id } = req.params;
        const data = req.body;

        const publication = await Publication.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Publication update!',
            publication
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error update!',
            error
        })
    }
}

export const deletePublication = async (req, res) => {
    try {

        const { id } = req.params;

        const publication = await Publication.findByIdAndUpdate(id, { status: false }, { new: true });


        res.status(200).json({
            success: true,
            msg: 'Deactivate publication!',
            publication,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Deactivate error!',
            error
        })
    }
}