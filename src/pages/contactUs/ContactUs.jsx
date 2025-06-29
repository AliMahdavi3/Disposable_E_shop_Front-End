import React from 'react'
import Footer from '../../components/Footer'
import TitleAndImageSection from './TitleAndImageSection'
import NewsMembership from './NewsMembership'
import SocialMedia from './SocialMedia'
// import GoogleMap from './GoogleMap'
import TicketToSupport from './ticketSystem/TicketToSupport'

const ContactUs = () => {
    return (
        <>
            <TitleAndImageSection />
            <div className='container py-20'>
                <div className="grid grid-cols-5 gap-6">
                    <NewsMembership />
                    <TicketToSupport />
                </div>
            </div>
            <SocialMedia />
            {/* <GoogleMap /> */}
            <Footer />
        </>
    )
}

export default ContactUs
