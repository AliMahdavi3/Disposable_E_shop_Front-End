import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { apiPath } from '../../../services/httpService';

const ProductsSection = ({ setOpen, cartItems, setCurrentItem, handleDeleteItemFromCart }) => {

    return (
        <>
            <div className='max-h-96 overflow-y-auto'>
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div
                            key={index}
                            className='flex justify-between items-center mt-2
                            rounded-xl border-2 border-gray-300 py-2 px-2'
                        >
                            <img
                                className='w-[15%] md:w-[10%] rounded-lg border-2'
                                src={`${apiPath}/${item.product.imageUrl[0]}`}
                                alt=""
                            />
                            <span className="text-gray-500 font-medium">
                                {item.product.title}
                            </span>
                            <p className='text-xs md:text-base font-medium text-gray-500'>
                                {item.product.price}
                            </p>
                            <p className='md:ms-5 text-center font-medium text-gray-500'>
                                {item.quantity}
                            </p>
                            <div className='md:me-3 flex items-center'>
                                <FaTrashAlt
                                    onClick={() => handleDeleteItemFromCart(item.product._id)}
                                    className='text-red-600 cursor-pointer'
                                />
                                <FaEdit
                                    className='text-yellow-600 cursor-pointer ms-2'
                                    onClick={() => {
                                        setCurrentItem(item);
                                        setOpen(true);
                                    }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='my-10 flex flex-col justify-center items-center'>
                        <img
                            className='w-[30%] h-[30%] border-4 rounded-full'
                            src="/assets/images/cart/empty-cart.png"
                            alt=""
                        />
                        <h1 className='text-center pt-5 text-xs md:text-xl font-medium
                        text-gray-400'>
                            هنوز محصولی به سبد اضافه نکرده اید!
                        </h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductsSection
