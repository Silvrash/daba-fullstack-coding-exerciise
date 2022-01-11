import { FormikConfig, getIn, useFormik } from "formik";
import React from "react";
import { CheckboxProps, DropdownProps, InputOnChangeData, TextAreaProps } from "semantic-ui-react";
import { parseStringifiedNumber } from "../services";

export interface FormHandlers {
    handleChange: (
        _: React.SyntheticEvent<HTMLElement, Event> | undefined,
        data: DropdownProps | InputOnChangeData | TextAreaProps | CheckboxProps
    ) => void;
    handleBlur: (event: any) => void;
    getError: (key: string) => string | undefined;
}

function isNumberInputType(data: Record<string, any>) {
    const type = data["data-type"] ?? data.type;
    return type === "number";
}

export type FormChangeDataProps = DropdownProps | InputOnChangeData | TextAreaProps | CheckboxProps;

export function useForm<Values>(config: FormikConfig<Values>) {
    const formik = useFormik<Values>(config);
    const { setFieldValue, setFieldTouched, touched, errors } = formik;

    const handleBlur = React.useCallback(
        (event: any) => setFieldTouched(event.currentTarget.name, true),
        [setFieldTouched]
    );

    const handleChange = React.useCallback(
        async (
            _: React.SyntheticEvent<HTMLElement, Event> | undefined,
            data: FormChangeDataProps
        ) => {
            try {
                const { value, name, max } = data;
                if (!isNumberInputType(data)) {
                    await setFieldValue(name, value);
                    return;
                }
                const num = parseStringifiedNumber(value);
                if (max && num > max) return;
                await setFieldValue(name, !value ? "" : num);
            } catch {
                // do nothing
                return;
            }
        },
        [setFieldValue]
    );

    const getError = React.useCallback(
        (key: string) => {
            const isTouched = getIn(touched, key);
            const error = getIn(errors, key);
            return isTouched && error ? error : undefined;
        },
        [touched, errors]
    );

    function getErrors(keys: string[]) {
        let final = null;
        for (let myKey of keys) {
            final = final || getError(myKey);
        }
        return final;
    }

    return {
        ...formik,
        handleBlur,
        handleChange,
        getError,
        getErrors,
    };
}
