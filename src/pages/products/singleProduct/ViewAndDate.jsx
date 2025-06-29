import React from 'react'
import { FaRegEye, FaStar } from 'react-icons/fa'
import moment from "jalali-moment";

const ViewAndDate = ({ data }) => {
    return (
        <div className='pt-2 md:pt-5 flex justify-start flex-col lg:flex-row text-xs
            text-gray-500'>
            <div className='flex justify-start items-center py-2'>
                <FaRegEye />
                <span className='mx-3'>{data.product.views}</span>
            </div>
            <div className='flex justify-start py-2 items-center'>
                <FaStar className='text-amber-500'/>
                <FaStar className='text-amber-500'/>
                <FaStar className='text-amber-500'/>
                <FaStar className='text-amber-500'/>
                <FaStar className='text-amber-500'/>
            </div>
            <div className='flex justify-start py-2 items-center'>
                <span className='md:mx-5'>اضافه شده در تاریخ : {
                    moment(data.product.createdAt).locale('fa').format('YYYY/MM/DD')
                }</span>
            </div>
        </div>
    )
}

export default ViewAndDate
