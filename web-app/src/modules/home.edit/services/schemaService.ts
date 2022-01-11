import * as yup from "yup";

export const UpdateInfoValidationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string(),
    name: yup.string().required(),
    bio: yup.string(),
    phone: yup.string(),
});
