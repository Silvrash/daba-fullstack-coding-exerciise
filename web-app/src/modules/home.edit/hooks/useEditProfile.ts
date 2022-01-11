import { useCurrentUser, useForm } from "../../_shared/hooks";
import { UpdateInfoFormInput } from "../types";
import { useHistory } from "react-router-dom";
import { UpdateInfoValidationSchema } from "../services/schemaService";
import { FormikHelpers } from "formik";
import Constants from "../../_shared/constants";
import { updateInfo } from "../services/updateInfo";
import { UpdateUserInput } from "../../_shared/schema";

export function useEditProfile() {
    const history = useHistory();
    const { currentUser, updateUser } = useCurrentUser();

    const form = useForm<UpdateUserInput>({
        initialValues: {
            email: currentUser?.email!,
            name: currentUser?.name,
            bio: currentUser?.bio,
            phone: currentUser?.phone,
            photo: currentUser?.photo,
        },
        onSubmit,
        validationSchema: UpdateInfoValidationSchema,
    });

    const { values, isSubmitting, handleSubmit, handleBlur, handleChange, getError,setFieldValue } = form;

    async function onSubmit(values: UpdateUserInput, actions: FormikHelpers<UpdateUserInput>) {
        actions.setSubmitting(true);

        const res = await updateInfo(values);

        actions.setSubmitting(false);

        if (res.success) {
            updateUser({ user: res.data! });
            history.replace(Constants.ROUTES.home);
        }
    }

    return {
        ...values,
        isSubmitting,
        handleSubmit,
        handleBlur,
        handleChange,
        getError,
    };
}
