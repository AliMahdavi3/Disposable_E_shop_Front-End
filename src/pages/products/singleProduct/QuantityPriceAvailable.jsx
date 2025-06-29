import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityPriceAvailable = ({ quantity, setQuantity, data }) => {
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };
    return (
        <div className='flex justify-between items-center md:flex-row flex-col 
            pt-10 pb-5 md:py-10 px-10'>
            <div className="flex items-center justify-center md:justify-start mb-5">
                <button
                    className="bg-white text-amber-500 p-1 md:p-2 rounded-md
                    border-2 border-amber-500"
                    onClick={decreaseQuantity}
                >
                    <FaMinus />
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    className="w-[25%] md:py-1 text-center rounded text-amber-500 
                    border-y-2 border-amber-500"
                />
                <button
                    className="bg-white text-amber-500 p-1 md:p-2 rounded-md
                    border-2 border-amber-500"
                    onClick={increaseQuantity}
                >
                    <FaPlus />
                </button>
            </div>

            <span className='text-xs md:text-sm mb-5'>در انبار :
                {
                    data.product.available ? (
                        <span className='font-medium text-green-800'>موجود است</span>
                    ) : (
                        <span className='font-medium text-rose-600'>موجود نیست</span>
                    )
                }
            </span>

            <p className='flex items-center mb-5 text-gray-500'>
                <span className='mx-2 font-medium text-xs lg:text-xl'>
                    {data.product.price}
                </span>
                <span className='text-xs'>تومان</span>
            </p>

        </div>
    )
}

export default QuantityPriceAvailable
