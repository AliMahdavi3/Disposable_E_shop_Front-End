import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import FormikControl from '../../../components/FormikComponents/FormikControl';
import { initialValues, onSubmit, validationSchema } from './core/ticketCore';
import { getUserService } from '../../../services/contactUs';
import { useNavigate } from 'react-router-dom';

const TicketToSupport = () => {
    const [userData, setUserData] = useState(null);
    const [reInitialValues, setReInitialValues] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const handleFetchUserInfo = async () => {
                try {
                    const res = await getUserService();
                    if (res.status === 200) {
                        setUserData(res.data.user);
                        console.log(res.data.user);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            handleFetchUserInfo();
        }
    }, [token]);

    useEffect(() => {
        if (userData) {
            setReInitialValues({
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                subject: "",
                description: "",
                image: [],
            });
        } else {
            setReInitialValues(initialValues);
        }
    }, [userData]);


    return (
        <Formik
            initialValues={reInitialValues || initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions)}
            validationSchema={token ? validationSchema : null}
            enableReinitialize
        >
            {formik => {
                return (
                    <div className="col-span-5 md:col-span-3">
                        <h3 className='mb-5 font-medium text-mgreen text-lg'>
                            ارسال پیام به تیم پشتیبانی
                        </h3>
                        <Form>
                            <div className='flex justify-between gap-4 items-center'>
                                <FormikControl
                                    control="ticketInput"
                                    formik={formik}
                                    type="email"
                                    name="email"
                                    label="ایمیل"
                                    placeholder="example@gmail.com"
                                    readOnly={true}
                                />
                                <FormikControl
                                    control="ticketInput"
                                    formik={formik}
                                    type="text"
                                    name="phone"
                                    label="شماره تلفن"
                                    placeholder="09123456789"
                                    readOnly={true}
                                />
                            </div>
                            <div className='flex justify-between gap-4 items-center'>
                                <FormikControl
                                    control="ticketInput"
                                    formik={formik}
                                    type="text"
                                    name="subject"
                                    label="موضوع پیام"
                                    placeholder="موضوع پیام"
                                />
                                <FormikControl
                                    control="ticketInput"
                                    formik={formik}
                                    type="text"
                                    name="name"
                                    label="نام و نام خانوادگی"
                                    placeholder="نام و نام خانوادگی"
                                    readOnly={true}
                                />
                            </div>

                            <FormikControl
                                className={'py-2 px-5 rounded-3xl bg-blue-600 bg-opacity-25'}
                                control="textarea"
                                formik={formik}
                                name="description"
                                cols="30"
                                rows="5"
                                label="توضیحات"
                                placeholder="توضیحات"
                            />

                            {
                                token ? (
                                    <>
                                        <FormikControl
                                            control="file"
                                            formik={formik}
                                            name="image"
                                            placeholder=". حداکثر 5 تصویر"
                                            isMultiple={true}
                                        />
                                        <button
                                            type='submit'
                                            className={`w-1/3 mt-3 rounded-full 
                                            text-white bg-blue-600
                                            font-medium bg-opacity-60 text-sm
                                            hover:bg-violet-700 py-3
                                            ${!formik.values.subject ||
                                                    !formik.values.description ?
                                                    "disabled" : null}`}
                                        >
                                            ارسال پیام
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => navigate('/login')}
                                        className='bg-blue-500 text-white px-4 py-2
                                        rounded-full text-xs md:text-base'>
                                        برای ارسال تیکت لطفا وارد حساب خود شوید
                                    </button>
                                )
                            }
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default TicketToSupport
