import { body } from "express-validator";

export const organizationValidation = [
    body('name', 'Введите заголовок').isLength({ min: 3 }).isString(),
];