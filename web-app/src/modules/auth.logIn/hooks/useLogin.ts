import { useCurrentUser, useForm } from "../../_shared/hooks";
import { LoginFormInput } from "../types";
import { useHistory } from "react-router-dom";
import { LoginValidationSchema } from "../services/schemaService";
import { FormikHelpers } from "formik";
import Constants from "../../_shared/constants";
import { validateUser } from "../services/validateUser";

export function useLogin() {
    const history = useHistory();
    const { updateUser } = useCurrentUser();

    const form = useForm<LoginFormInput>({
        initialValues: { email: "", password: "" },
        onSubmit,
        validationSchema: LoginValidationSchema,
    });

    const { values, isSubmitting, handleSubmit, handleBlur, handleChange, getError } = form;

    async function onSubmit(values: LoginFormInput, actions: FormikHelpers<LoginFormInput>) {
        actions.setSubmitting(true);

        const res = await validateUser(values);

        actions.setSubmitting(false);

        if (res.success) {
            updateUser(res.data!);
            history.replace(Constants.ROUTES.home);
        }
    }

    function toSignUp(){
        history.push(Constants.ROUTES.signUp)
    }

    return {
        ...values,
        isSubmitting,
        handleSubmit,
        handleBlur,
        handleChange,
        getError,
        toSignUp
    };
}
