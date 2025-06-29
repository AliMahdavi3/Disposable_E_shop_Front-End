import React from 'react'

const GoogleMap = () => {
    return (
        <div className="container pb-10">
            <h1 className='text-center py-10 text-mgreen font-bold'>آدرس ما</h1>
            <div className='w-full'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d103727.53456132182!2d51.04402631624899!3d35.6650469041418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1709288702821!5m2!1sen!2s"
                    width="100%" height="450" style={{ borderRadius: '30px' }} allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Google Maps location of our office"
                ></iframe>
            </div>
        </div>
    )
}

export default GoogleMap
