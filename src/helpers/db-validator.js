import Publication from '../publications/publication.model.js';
import Course from "../courses/course.model.js";
import Comment from "../comments/comment.model.js";

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

export const idCourseValid = async (id = ' ') => {
    const courseExists = await Course.findOne({ id });

    if (!courseExists) {
        throw new Error(`Course ${ id } does not exist in the database!`);
    }
}

export const nameCourseValid = async (name = ' ') => {
    const courseExists = await Course.findOne({ name });

    if (!courseExists) {
        throw new Error(`Course ${ name } does not exist in the database!`);
    }
}

export const idCommentValid = async (id = ' ') => {
    const commentExists = await Comment.findOne({ id });

    if (!commentExists) {
        throw new Error(`Comment ${ id } does not exist in the database!`);
    }
}

export const publicationCommentValid = async (publication = ' ') => {
    const commentExists = await Comment.findOne({ publication });

    if (!commentExists) {
        throw new Error(`Comment ${ publication } does not exist in the database!`);
    }
}