import { useState } from "react";

import { useValidate } from "./useValidate";

export const useForm = (initialValues: {}, onSubmitHandler: any) => {
    const [formValues, setFormValues] = useState(initialValues as any);

    const { validateForm, formErrors, disabled } = useValidate(formValues, initialValues);

    // Getting form input
    function formValueChangeHandler(e: any) {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    };

    //Submitting form
    const onSubmit = (e: any) => {
        e.preventDefault();

        onSubmitHandler(e, formValues);

        setFormValues(initialValues);
    };

    return {
        onSubmit,
        formValueChangeHandler,
        validateForm,
        formValues,
        formErrors,
        disabled
    };
};