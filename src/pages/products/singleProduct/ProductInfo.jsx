import React from 'react'

const ProductInfo = ({ data }) => {
    const Info = ({ label, value }) => {
        return (
            <p className='font-medium '>
                <span className='text-gray-600'>
                    {label}
                    {value}
                </span>
            </p>
        )
    }
    return (
        <div className='container text-xs md:text-sm'>
            <h5 className='py-3 text-mgreen'>مشخصات کالا</h5>
            <div className='lg:flex justify-between items-center'>
                <Info label={'ابعاد : '} value={data.product.size} />
                <Info label={'وزن : '} value={data.product.weight} />
                <Info label={'کد کالا : '} value={data.product.productCode} />
                <Info label={'دسته بندی : '} value={data.product.category} />
            </div>
        </div>
    )
}

export default ProductInfo
