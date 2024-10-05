import {FC, useState} from "react";
import cls from './RegisterForm.module.css'
import {useFormik} from 'formik';
import {FormCheckbox, FormFields, FormSubmission} from "../../../features/Register";
import {validationSchema} from "../schema/validationSchema.ts";
import {useAppSelector} from "../../../app/providers/store/hooks.ts";
import {selectFormData, selectUserData} from "../../../app/slices/registerSlice.ts";
import {CurrentValues} from "../../../shared/types/register/types.ts";

interface RegisterFormProps {
    handleRegister: (data:CurrentValues)=> void
}

const RegisterForm: FC<RegisterFormProps> = ({handleRegister}) => {
    const formData = useAppSelector(selectFormData);
    const userData = useAppSelector(selectUserData);
    const initialValues = Object.keys(userData).length == 0 ? formData.reduce((acc, field) => ({
        ...acc,
        [field.name]: ''
    }), {}) : userData;
    const formik = useFormik({
        initialValues,
        onSubmit: data => {
            handleRegister(data)
        },
        validationSchema: validationSchema(formData)
    });
    const [submit, setSubmit] = useState(false)
    return (
        <form className={cls.form} onSubmit={formik.handleSubmit}>
            <FormFields formik={formik} fields={formData}/>
            <FormCheckbox handleCheckboxClick={() => {
                setSubmit((prev)=>!prev)
            }}/>
            <FormSubmission isActive={submit}/>
        </form>

    );
};

export default RegisterForm;
