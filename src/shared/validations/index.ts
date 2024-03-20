import * as Yup from "yup";
import yupPassword from "yup-password";

yupPassword(Yup);

export const email = (name = "L'email") =>
    Yup.string()
        .email(`${name} est invalide`)
        .required(`${name} est obligatoire`);

export const required = (name: string) =>
    Yup.string().required(`${name} est obligatoire`);

export const password = (name: string) =>
    Yup.string()
        .required(`${name} est obligatoire`)
        .min(1, `${name} doit contenir au moins une lettre majuscule.`)
        .min(1, `${name} doit contenir au moins une lettre minuscule.`)
        .min(1, `${name} doit contenir au moins un chiffre.`)
        .min(1, `${name} doit contenir au moins un caractère spécial.`);

export const confirmPassword = (ref: string) =>
    Yup.string()
        .oneOf(
            [Yup.ref(ref), undefined],
            "Les mots de passe ne correspondent pas"
        )
        .required("La confirmation du mot de passe est requise");

export const validateLink = (name: string) =>
    Yup.string()
        .required(`${name} est obligatoire`)
        .url(`${name} doit être une URL valide`);

export const requiredEmailValidation = (name = "L'email") =>
    Yup.string().email(`${name} est invalide`);

export const nullableEmailValidation = (name = "L'email") =>
    Yup.string().email(`${name} est invalide`).nullable();

export const requiredStringValidation = (
    name = "Ce champ",
    min = 1,
    max = 255
) =>
    Yup.string()
        .min(min, `${name} doit avoir au moins ${min} caractères`)
        .max(max, `${name} doit avoir au plus ${max} caractères`)
        .required();

export const requiredArrayValidation = (name = "Ce champ") => {
    Yup.array().required(`${name} est obligatoire`);
}

export const nullableArrayValidation = () => {
    Yup.array(Yup.number().nullable())
}

export const nullableStringValidation = () => Yup.string().nullable();

export const requiredNumberValidation = () => Yup.number();

export const nullableNumberValidation = () => Yup.number().nullable();

export const requiredIntValidation = (
    name = "Ce champ",
    min = 0,
    max = 2147483647
) =>
    Yup.number()
        .min(min, `${name} doit avoir au moins ${min}`)
        .max(max, `${name} doit avoir au plus ${max}`);

export const nullableIntValidation = () => Yup.number().nullable();

export const requiredBooleanValidation = () => Yup.boolean();

export const nullableBooleanValidation = () => Yup.boolean().nullable();

export const passwordValidation = (name = "Le mot de passe") =>
    Yup.string()
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
        .min(8, `${name} doit avoir au moins 8 caractères`)
        .max(20, `${name} doit avoir au plus 20 caractères`);

export const confirmPasswordValidation = (
    name = "La confirmation du mot de passe",
    ref = "password"
) =>
    Yup.string()
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
        .min(8, `${name} doit avoir au moins 8 caractères`)
        .max(20, `${name} doit avoir au plus 20 caractères`)
        .oneOf([Yup.ref(ref)], "Les mots de passe ne correspondent pas");
