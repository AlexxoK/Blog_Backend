import Publication from '../publications/publication.model.js';

export const idPublicationValid = async (id = ' ') => {
    const publicationExists = await Publication.findOne({ id });

    if (!publicationExists) {
        throw new Error(`Publication ${ id } does not exist in the database!`);
    }
}

export const titlePublicationValid = async (title = ' ') => {
    const publicationExists = await Publication.findOne({ title });

    if (!publicationExists) {
        throw new Error(`Publication ${ title } does not exist in the database!`);
    }
}