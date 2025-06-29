import React, { useEffect, useState } from 'react'
import CreateTicket from './CreateTicket';
import TicketList from './TicketList';
import { getUserAllTicketsService } from '../../../services/contactUs';
import ResponseModal from './response/ResponseModal';

const Support = () => {

    const [data, setData] = useState([]);
    const [createTicketModal, setCreateTicketModal] = useState(false);
    const [respondToTicketModal, setRespondToTicketModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    useEffect(() => {
        const handleFetchTickets = async () => {
            try {
                const res = await getUserAllTicketsService();
                if (res.status === 200) {
                    setData(res.data.tickets);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        handleFetchTickets();
    }, []);

    const handleViewTicket = (ticketId) => {
        setSelectedTicketId(ticketId);
        setRespondToTicketModal(true);
    };

    return (
        <section className="border-2 mt-5 px-5 py-5 h-fit w-full rounded-lg">
            <CreateTicket
                createTicketModal={createTicketModal}
                setCreateTicketModal={setCreateTicketModal}
            />
            <TicketList data={data} handleViewTicket={handleViewTicket} />
            <ResponseModal
                ticketId={selectedTicketId}
                respondToTicketModal={respondToTicketModal}
                setRespondToTicketModal={setRespondToTicketModal}
            />
        </section>
    )
}

export default Support
