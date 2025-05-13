import { Router } from "express";
import { check } from "express-validator";
import { postPublication, getPublications, getPublicationById, getPublicationByTitle, getPublicationsByCourseName, putPublication, deletePublication } from "./publication.controller.js";
import { idPublicationValid, titlePublicationValid, nameCourseValid } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/postPublication",
    [
        validarCampos
    ],
    postPublication
)

router.get("/getPublications", getPublications);

router.get(
    "/getPublicationById/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idPublicationValid),
        validarCampos
    ],
    getPublicationById
)

router.get(
    "/getPublicationByTitle/:title",
    [
        check("title").custom(titlePublicationValid),
        validarCampos
    ],
    getPublicationByTitle
)

router.get(
    "/getPublicationsByCourseName/:name",
    [
        check("name").custom(nameCourseValid),
        validarCampos
    ],
    getPublicationsByCourseName
)

router.put(
    "/putPublication/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idPublicationValid),
        validarCampos
    ],
    putPublication
)

router.delete(
    "/deletePublication/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idPublicationValid),
        validarCampos
    ],
    deletePublication
)

export default router;