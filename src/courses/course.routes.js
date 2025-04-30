import { Router } from "express";
import { check } from "express-validator";
import { postCourse, getCourses, getCourseById, getCourseByName, putCourse, deleteCourse } from "./course.controller.js";
import { idCourseValid, nameCourseValid } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/postCourse",
    [
        validarCampos
    ],
    postCourse
)

router.get("/getCourses", getCourses);

router.get(
    "/getCourseById/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idCourseValid),
        validarCampos
    ],
    getCourseById
)

router.get(
    "/getCourseByName/:name",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(nameCourseValid),
        validarCampos
    ],
    getCourseByName
)

router.put(
    "/putCourse/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idCourseValid),
        validarCampos
    ],
    putCourse
)

router.delete(
    "/deleteCourse/:id",
    [
        check("id", "id invalid!").isMongoId(),
        check("id").custom(idCourseValid),
        validarCampos
    ],
    deleteCourse
)

export default router;