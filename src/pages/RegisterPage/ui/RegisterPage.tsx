import {FC, useEffect, useState} from "react";
import cls from './RegisterPage.module.css'
import IMAGES from "../../../shared/assets/images/images.ts";
import {Spinner} from "../../../shared/ui/Spinner/Spinner.tsx";
import {CurrentValues} from '../../../shared/types/register/types.ts'
import RegisterSuccess from "../../../widgets/RegisterSuccess/ui/RegisterSuccess.tsx";
import {RegisterForm} from "../../../widgets/RegisterForm";
import Toast from "../../../shared/ui/Toast/Toast.tsx";
import {postFormData} from "../../../shared/api/register.ts";
import {fetchFormData} from "../../../app/actions/formDataActions.ts";
import {useAppDispatch, useAppSelector} from "../../../app/providers/store/hooks.ts";
import {setLoading} from "../../../app/slices/loadingSlice.ts";
import { setUserData} from "../../../app/slices/registerSlice.ts";

const RegisterPage: FC = () => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector((state) => state.loading);
    const [isShown, setIsShown] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const showToast = (message: string) => {
        setToastMessage(message);
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 3000);
    };
    useEffect(() => {
        dispatch(fetchFormData());
    }, [dispatch]);

    const handleRegister = (data: CurrentValues) => {
        dispatch(setUserData(data))
        dispatch(setLoading(true))
        postFormData(data).then(() => {
            dispatch(setLoading(false));
            setIsRegistered(true);
        }).catch((reason) => {
            const {data} = reason.response
            dispatch(setLoading(false));
            showToast(data)
        })
    };

    return (
        <div className={cls.authPage}>
            <div className={cls.imageWrapper}>
                <div className={cls.imageBlock}>
                    <img className={cls.image} src={IMAGES.authImage} alt="auth-image"/>
                </div>
            </div>
            {
                loading ? <div className={cls.contentContainer}>
                    <div className={cls.authBlock}>
                        <Spinner/>
                    </div>
                </div> : <div className={cls.contentContainer}>
                    <div className={cls.authBlock}>
                        {isRegistered ? (
                            <RegisterSuccess onSendAgain={() => {
                                setIsRegistered(false)
                            }}/>
                        ) : (
                            <RegisterForm handleRegister={handleRegister}/>
                        )}
                    </div>
                </div>
            }
            {isShown && <Toast message={toastMessage}/>}
        </div>
    );
}

export default RegisterPage;
