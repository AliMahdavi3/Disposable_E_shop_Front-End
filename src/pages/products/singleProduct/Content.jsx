import React from 'react'

const Content = ({ data }) => {
    return (
        <div className='md:px-10'>
            <span className='text-gray-500'>توضیحات محصول</span>
            <p className='mt-2 font-medium text-xs md:text-sm text-gray-500'>
                {data.product.content}
            </p>
        </div>
    )
}

export default Content
