import * as Yup from "yup";
import {FormData} from "../../../shared/types/register/types.ts";

export const validationSchema = (formData:FormData[]) => Yup.object().shape(
    formData.reduce<Record<string, Yup.StringSchema>>((acc, field) => {
        switch (field.type) {
            case 'email':
                acc[field.name] = Yup.string().email('Некоректный email');
                break;
            case 'string':
                acc[field.name] = Yup.string().matches(/^[а-яА-Я\s]+$/, 'Должно быть строкой с буквами без цифр или символов');
                break;
            case 'password':
                acc[field.name] = Yup.string();
                if (field.name === 'password2') {
                    acc[field.name] = acc[field.name].oneOf(
                        [Yup.ref('password1')],
                        'Пароли не совпадают'
                    );
                }
                break;
            case 'select':
                acc[field.name] = Yup.object();
                break;
            default:
                break;
        }
        if (field.required) {
            acc[field.name] = acc[field.name].required('Поле обязательно для заполнения');
        }
        return acc;
    }, {})
)
