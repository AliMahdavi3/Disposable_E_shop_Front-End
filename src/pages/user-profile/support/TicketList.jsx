import React from 'react'

const TicketList = ({ data, handleViewTicket }) => {
    return (
        <>
            {
                data?.length > 0 ? (
                    <ul>
                        <li className='flex justify-between items-center py-2 border-b
                            text-amber-500 text-xs'>
                            <span className='w-[20%]'>موضوع</span>
                            <span className='w-[50%]'>توضیحات</span>
                        </li>
                        {
                            data?.map((t, index) => (
                                <li key={index} className='border-b py-3 flex justify-between items-center
                                    text-sm text-gray-500'>
                                    <span className='w-[20%] line-clamp-1 truncate'>{t.subject}</span>
                                    <span className='w-[50%] line-clamp-1 truncate'>{t.description}</span>
                                    <button
                                        onClick={() => handleViewTicket(t._id)}
                                        className='bg-mgreen text-white px-2 py-1
                                        rounded-md text-sm'
                                    >
                                        مشاهده
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <div className='col-span-3 flex flex-col justify-center items-center mt-10'>
                        <img className='w-[25%] border-4 rounded-full'
                            src="/assets/images/profile/ticket.png"
                            alt="orders"
                        />
                        <p className='mt-2 text-xs md:text-lg font-medium text-gray-400'>
                            هنوز تیکتی ثبت نکرده اید..!
                        </p>
                    </div>
                )
            }
        </>
    )
}

export default TicketList
