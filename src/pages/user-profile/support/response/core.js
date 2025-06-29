import * as Yup from 'yup';
import { Alert } from '../../../../utils/sweetalert2';
import { respondToTicketService } from '../../../../services/contactUs';

export const initialValues = {
    responseMessage: '',
};

export const onSubmit = async (values, actions, ticketId, setTicket) => {
    try {
        const res = await respondToTicketService(ticketId, values);
        if (res.status === 200) {
            Alert('موفقیت!', 'پاسخ شما با موفقیت ثبت شد.', 'success');
            setTicket(res.data.ticket);
            actions.resetForm();
        }
    } catch (error) {
        console.error("Error", error.message);
    }
};

export const validationSchema = Yup.object({
    responseMessage: Yup.string().required("لطفا این قسمت را پر کنید"),
});