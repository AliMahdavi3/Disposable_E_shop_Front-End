import React from 'react'
import { FaStar } from 'react-icons/fa'
import { apiPath } from '../../services/httpService'

const ProductCard = ({ product, colSpan }) => {
    return (
        <div className={`lg:col-span-1 h-fit box_shadow rounded-lg
            hover:shadow-lg bg-white bg-opacity-50 cursor-pointer col-span-2 
            ${product.available ? ' hover:shadow-[#17907F]' : ' hover:shadow-rose-500'}`}
        >
            <a
                href={`/products/${product._id}`}
                target='_blank'
                rel='noopener noreferrer'
            >
                <img
                    src={`${apiPath}/${product.imageUrl[1]}`}
                    className='h-2/3 w-full'
                    alt={product.title}
                />
            </a>

            <div className='px-3 lg:px-5 text-gray-500'>
                <a
                    href={`/products/${product._id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <h3 className={`font-medium text-xs lg:text-base`}>
                        {product.title}
                    </h3>

                    <p className='py-2 lg:py-4 text-xs text-gray-500 
                        font-medium truncate'>
                        {product.content}
                    </p>

                    <div className='flex flex-col lg:flex-row justify-between items-start
                        lg:items-center'>
                        <p className='font-medium text-xs'>
                            {
                                product.available ? (
                                    <span className='text-green-800'>
                                        موجود است
                                    </span>
                                ) : (
                                    <span className='text-rose-600'>
                                        موجود نیست
                                    </span>
                                )
                            }
                        </p>

                        <p className='flex justify-end text-xs lg:text-sm'>
                            <span>
                                {product.rating}
                            </span>
                            <FaStar className='ms-2 text-amber-500' />
                        </p>
                    </div>
                </a>

                <div className='flex justify-between items-center py-2 lg:py-5'>

                    <a href={`/products/${product._id}`}
                        target='_blank' rel='noopener noreferrer'>
                        <button className={`hover:bg-violet-700 cursor-pointer 
                            py-1 bg-[#007274] text-xs text-white px-3 rounded-md`}>
                            خرید
                        </button>
                    </a>

                    <p className='flex flex-col lg:flex-row items-end lg:items-center'>
                        <span className='text-xs'>تومان</span>
                        <span className='ms-2 font-medium text-xs lg:text-sm'>
                            {product.price}
                        </span>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default ProductCard
