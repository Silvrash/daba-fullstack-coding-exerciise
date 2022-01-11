import { useCurrentUser, useForm } from "../../_shared/hooks";
import { SignUpFormInput } from "../types";
import { useHistory } from "react-router-dom";
import { SignUpValidationSchema } from "../services/schemaService";
import { FormikHelpers } from "formik";
import Constants from "../../_shared/constants";
import { signUpUser } from "../services/signUpUser";

export function useSignUp() {
    const history = useHistory();
    const { updateUser } = useCurrentUser();

    const form = useForm<SignUpFormInput>({
        initialValues: { email: "", password: "" },
        onSubmit,
        validationSchema: SignUpValidationSchema,
    });

    const { values, isSubmitting, handleSubmit, handleBlur, handleChange, getError } = form;

    async function onSubmit(values: SignUpFormInput, actions: FormikHelpers<SignUpFormInput>) {
        actions.setSubmitting(true);

        const res = await signUpUser(values);

        actions.setSubmitting(false);
        console.log(res)

        if (res.success) {
            updateUser(res.data!);
            history.replace(Constants.ROUTES.home);
        }
    }

    function toLogin(){
        history.push(Constants.ROUTES.login)
    }

    return {
        ...values,
        isSubmitting,
        handleSubmit,
        handleBlur,
        handleChange,
        getError,toLogin
    };
}
