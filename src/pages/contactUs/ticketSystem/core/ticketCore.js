import * as Yup from 'yup'
import { createNewTicketService } from '../../../../services/contactUs';
import { Alert } from '../../../../utils/sweetalert2';


export const initialValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
    image: [],
};


export const onSubmit = async (values, actions) => {
    try {
        const res = await createNewTicketService(values);
        if (res.status === 201) {
            Alert('تیکت شما ثبت شد', 'عملیات موفقیت آمیز بود!', 'success');
            actions.resetForm();
        }
    } catch (error) {
        Alert('Error!', error.message, 'error');
        console.log(error);
    }
};

export const validationSchema = Yup.object({
    name: Yup.string().required("لطفا این قسمت را پر کنید"),
    email: Yup.string().required("لطفا این قسمت را پر کنید")
        .email("لطفا قالب ایمیل را رعایت کنید : aaa@example.bbb"),
    phone: Yup.string().required("لطفا این قسمت را پر کنید"),
    subject:Yup.string().required("لطفا این قسمت را پر کنید"),
    description:Yup.string().required("لطفا این قسمت را پر کنید"),
});