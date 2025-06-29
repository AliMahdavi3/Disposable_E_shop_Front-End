import React from 'react'
import { useNavbarContext } from '../../../context/NavbarContext';
import { FaCartPlus, FaQuestionCircle } from 'react-icons/fa';
import { addToCartService } from '../../../services/product';
import { Alert } from '../../../utils/sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddToCartButton = ({ data, quantity, productId, token }) => {

    const { updateCartCount } = useNavbarContext();
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        try {
            const quantityToSend = Number(quantity);
            const res = await addToCartService(productId, quantityToSend);
            Alert('عملیات موفقیت آمیز بود', 'محصول به سبد خرید اضافه شد!', 'success')
            updateCartCount(res.data.count);
            console.log(res.data.message);
        } catch (error) {
            Alert('خطایی رخ داده است!', error.message, 'error')
            console.error(error.message);
        }
    }

    return (
        <>
            <div className='md:px-8'>
                {
                    token ? (
                        <button
                            onClick={handleAddToCart}
                            className={`bg-mgreen flex justify-center items-center 
                            w-full text-white py-2 font-medium rounded-lg text-sm md:text-base
                            ${data.product.available ? 'hover:bg-violet-800' : 'disabled'}`}
                        >
                            <span>افزودن به سبد</span>
                            <FaCartPlus className='text-lg ms-3' />
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className='bg-mgreen md:hover:bg-violet-500 w-full text-white
                            py-2 font-medium rounded-lg text-xs md:text-base'
                        >
                            <span>برای خرید لطفا وارد حساب خود شوید</span>
                        </button>
                    )
                }

                <button
                    className='bg-rose-700 mt-3 flex justify-center items-center 
                    text-xs md:text-base w-full py-2 text-white font-medium 
                    rounded-lg hover:bg-violet-800'
                >
                    <span className='mt-1'>سوالی دارید ؟</span>
                    <FaQuestionCircle className='text-base md:text-lg ms-3' />
                </button>
            </div>
        </>
    )
}

export default AddToCartButton
