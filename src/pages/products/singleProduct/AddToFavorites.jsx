import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaReply } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { addProductToFavoritesService } from '../../../services/product';
import { Toast } from '../../../utils/sweetalert2';


const AddToFavorites = ({ productId, data, token }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToFavorites = async () => {
        if (token) {
            try {
                const res = await addProductToFavoritesService(productId);
                if (res.status === 200) {
                    setIsFavorite(true);
                    Toast('محصول به لیست علاقه مندی اضافه شد!', 'success');
                }
            } catch (error) {
                Toast('خطایی رخ داده است!', 'error');
                console.log(error.message);
            }
        } else {
            Toast('لطفا وارد حساب خود شوید..!', 'warning');
        }
    };

    return (
        <div className='flex justify-between text-gray-500'>
            <h1 className='text-base md:text-xl font-bold'>
                {data.product.title}
            </h1>
            <div className='flex justify-center items-center'>
                <div onClick={handleAddToFavorites}>
                    {isFavorite ? (
                        <FaHeart className='text-rose-500 ml-3 md:ml-5 text-base 
                        md:text-xl cursor-pointer' />
                    ) : (
                        <FaRegHeart className='text-gray-500 ml-3 md:ml-5 text-base 
                        md:text-xl cursor-pointer' />
                    )}
                </div>
                <NavLink to="/products">
                    <FaReply className='text-gray-500 text-base md:text-xl' />
                </NavLink>
            </div>
        </div>
    )
}

export default AddToFavorites
