import {FC} from 'react';
import cls from './FormFields.module.css'
import {FormData,} from "../../../shared/types/register/types.ts";
import {Input} from "../../../shared/ui/Input/Input.tsx";
import {Label} from "../../../shared/ui/Label/Label.tsx";
import Icon from '../../../shared/assets/svg/Vector (2).svg?react'
import {FormikProps} from 'formik';
import {Option, Select} from "../../Select/Select.tsx";

type FormValues = Record<string, string | Option>

interface FormFieldsProps {
    fields: FormData[];
    formik: FormikProps<FormValues>;
}

const FormFields: FC<FormFieldsProps> = (props) => {
    const {formik, fields} = props
    const {values, errors, touched, getFieldProps, setFieldValue} = formik
    return (
        <div className={cls.fields}>
            {fields.map((field) => {
                const {name, label} = field
                    return <div className={cls.field} key={name}>
                        <Label htmlFor={name} text={label}/>
                        {field.type === 'select' ?
                            <Select
                                options={field.options ?? []}
                                selected={values[name] as Option}
                                onChange={(option) =>
                                    setFieldValue(name, {title: option, value: option})
                                }
                                className={errors[name] && touched[name] ? cls.errorInput : (values[name] ? cls.successInput : '')}
                                placeholder={label}
                            /> : <>
                                <Input
                                    className={errors[name] && touched[name] ? cls.errorInput : (values[name] ? cls.successInput : '')}
                                    id={name}
                                    {...getFieldProps(name)}
                                    placeholder={label}
                                />
                                {values[name] && !errors[name] && <Icon className={cls.successIcon}/>}
                            </>
                        }
                        {touched[name] && errors[name] && <div className={cls.error}>{errors[name]}</div>}
                    </div>
                }
            )}
        </div>
    );
};

export default FormFields;
