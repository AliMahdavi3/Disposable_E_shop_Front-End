import React from 'react'
import { apiPath } from '../../../services/httpService'

const ProductCartList = ({ product, handleRemoveFavorite }) => {
    return (
        <div className='w-full flex justify-between items-center
            border-2 rounded-lg py-1 p-1 mb-1'>
            <img
                className='w-[15%] md:w-[10%] rounded-lg border-2'
                src={`${apiPath}/${product.imageUrl[1]}`}
                alt=""
            />
            <span className='font-medium text-xs text-gray-500'>
                {product.title}
            </span>
            <span className='font-medium text-xs text-gray-500'>
                {product.price}
            </span>
            {
                product.available ? (
                    <span className='font-medium text-xs 
                        md:text-sm text-green-800'>
                        موجود است
                    </span>
                ) : (
                    <span className='font-medium text-xs 
                        md:text-sm text-rose-600'>
                        موجود نیست
                    </span>
                )
            }
            <div className='flex justify-center items-center'>
                <a href={`/products/${product._id}`}
                    target='_blank' rel='noopener noreferrer'>
                    <button className={`hover:bg-violet-700 cursor-pointer 
                        py-1 bg-[#007274] text-xs text-white px-3 rounded-md`}>
                        خرید
                    </button>
                </a>
                <button className='hover:bg-violet-700 cursor-pointer mx-2 
                    py-1 bg-rose-600 text-xs text-white px-3 rounded-md'
                    onClick={() => handleRemoveFavorite(product._id)}
                >
                    حذف
                </button>
            </div>
        </div>
    )
}

export default ProductCartList
