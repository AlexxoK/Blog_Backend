import { Router } from "express";
import { check } from "express-validator";
import { postComment, getComments, getCommentById, getCommentByPublication, putComment, deleteComment } from "./comment.controller.js";
import { idCommentValid, publicationCommentValid } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/postComment",
    [
        validarCampos
    ],
    postComment
)

router.get("/getComments", getComments);

router.get(
    "/getCommentById/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idCommentValid),
        validarCampos
    ],
    getCommentById
)

router.get(
    "/getCommentByPublication/:title",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(publicationCommentValid),
        validarCampos
    ],
    getCommentByPublication
)

router.put(
    "/putComment/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idCommentValid),
        validarCampos
    ],
    putComment
)

router.delete(
    "/deleteComment/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idCommentValid),
        validarCampos
    ],
    deleteComment
)

export default router;