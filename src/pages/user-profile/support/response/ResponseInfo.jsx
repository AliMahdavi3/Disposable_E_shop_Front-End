import React from 'react'

const ResponseInfo = ({ ticket }) => {
    return (
        <>
            <div className="border-b flex justify-between items-center py-5 text-sm">
                <p className="text-gray-500">
                    <span className="text-amber-500">نام</span> : {ticket.name}
                </p>
                <p className="text-gray-500">
                    <span className="text-amber-500">ایمیل</span> : {ticket.email}
                </p>
                <p className="text-gray-500">
                    <span className="text-amber-500">تلفن</span> : {ticket.phone}
                </p>
                <p className="text-amber-500">
                    <span>وضعیت : </span>
                    {
                        ticket.ticketStatus === 'Open' ? (
                            <span className='text-mgreen'>
                                در جریان...
                            </span>
                        ) : (
                            <span className='text-rose-400'>
                                بسته شده
                            </span>
                        )
                    }
                </p>
            </div>
            <div className="flex flex-col py-2 text-gray-500 text-sm">
                <p className="pb-3">
                    <span className="text-amber-500">موضوع</span> : {ticket.subject}
                </p>
                <p>
                    <span className="text-amber-500">توضیحات</span> : {ticket.description}
                </p>
            </div>
        </>
    )
}

export default ResponseInfo
