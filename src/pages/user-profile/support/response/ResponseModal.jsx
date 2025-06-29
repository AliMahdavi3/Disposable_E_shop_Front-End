import React, { useEffect, useState } from 'react'
import ModalContainer from '../../../../components/ModalContainer';
import ResponseForm from './ResponseForm';
import { getSingleTicketService } from '../../../../services/contactUs';
import ResponseContainer from './ResponseContainer';
import ResponseInfo from './ResponseInfo';

const ResponseModal = ({ ticketId, respondToTicketModal, setRespondToTicketModal }) => {

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        if (ticketId && respondToTicketModal) {
            const handleFetchTicket = async () => {
                try {
                    const res = await getSingleTicketService(ticketId);
                    if (res.status === 200) {
                        setTicket(res.data.ticket);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            };
            handleFetchTicket();
        }
    }, [ticketId, respondToTicketModal]);

    return (
        <ModalContainer
            fullScreen={true}
            open={respondToTicketModal}
            onClose={() => setRespondToTicketModal(false)}
        >
            {ticket ? (
                <div className="border-2 border-gray-300 px-5 mt-5 rounded-md shadow-lg">
                    <ResponseInfo ticket={ticket} />
                    <ResponseContainer ticket={ticket} />
                    <ResponseForm
                        ticketId={ticketId}
                        setTicket={setTicket}
                        setRespondToTicketModal={setRespondToTicketModal}
                    />
                </div>
            ) : (
                <p>هیچ تیکتی یافت نشد!</p>
            )}
        </ModalContainer>
    )
}

export default ResponseModal
