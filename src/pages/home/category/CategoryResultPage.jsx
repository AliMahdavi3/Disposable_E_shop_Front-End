import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getProductsByCategoryService } from '../../../services/home';
import ProductCard from '../../../components/cardComponents/ProductCard';
import useSolidNavbar from '../../../hooks/useSolidNavbar';
import Footer from '../../../components/Footer';
import SpinnerLoad from '../../../components/SpinnerLoad';
import { FaArrowCircleLeft } from "react-icons/fa";

const CategoryResultPage = () => {

    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useSolidNavbar(true);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true);
            try {
                const response = await getProductsByCategoryService(category);
                setProducts(response.data.products);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductsByCategory();
    }, [category]);

    return (
        <>
            {
                loading ? (
                    <div className="h-screen">
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className='py-24 container'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-xs md:text-base px-3 md:px-5 py-2 md:py-1 text-gray-100
                            bg-gradient-to-r w-fit from-mgreen to-[#1F917C] 
                            rounded-full font-medium'>
                                <span>محصولات در دسته بندی : </span>
                                <span className='text-yellow-200'>{category}</span>
                            </h2>
                            <NavLink
                                to={'/'}
                                className="bg-violet-500 text-white 
                                p-2 rounded-full font-medium"
                            >
                                <FaArrowCircleLeft className='text-lg md:text-xl' />
                            </NavLink>
                        </div>
                        <hr className='border border-gray-300 my-5' />
                        <div className='grid grid-cols-4 gap-1 md:gap-3'>
                            {products.length > 0 ? (
                                products.map(product => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        colSpan={true}
                                    />
                                ))
                            ) : (
                                <p className='text-xs md:text-base text-center text-gray-600'>
                                    محصولی برای دسته بندی وجود ندارد...!
                                </p>
                            )}
                        </div>
                    </div>
                )
            }
            <Footer />
        </>
    )
}

export default CategoryResultPage
