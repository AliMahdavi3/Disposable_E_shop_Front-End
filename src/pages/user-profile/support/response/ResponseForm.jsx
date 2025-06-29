import React from 'react'
import { Form, Formik } from 'formik'
import FormikControl from '../../../../components/FormikComponents/FormikControl'
import { initialValues, onSubmit, validationSchema } from './core'
import SubmitButton from '../../../../components/FormikComponents/SubmitButton'

const ResponseForm = ({ ticketId, setTicket, setRespondToTicketModal }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions, ticketId, setTicket)}
            validationSchema={validationSchema}
        >
            {
                (formik) => {
                    return (
                        <Form>
                            <div className='py-3 pb-6'>
                                <FormikControl
                                    className="border-2 rounded-md px-5 py-2 text-xs"
                                    formik={formik}
                                    control="textarea"
                                    placeholder="پاسخ خود را وارد کنید!"
                                    name="responseMessage"
                                    rows={5}
                                />
                                <SubmitButton setOpen={setRespondToTicketModal} />
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default ResponseForm
