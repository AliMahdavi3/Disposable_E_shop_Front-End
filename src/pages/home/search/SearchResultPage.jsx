import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import useSolidNavbar from '../../../hooks/useSolidNavbar';
import ProductCard from '../../../components/cardComponents/ProductCard';
import ArticleCard from '../../../components/cardComponents/ArticleCard';
import Footer from '../../../components/Footer';
import { getSearchResultService } from '../../../services/home';
import SpinnerLoad from '../../../components/SpinnerLoad';
import { FaArrowCircleLeft } from 'react-icons/fa';

const SearchResultPage = () => {

    const { search } = useLocation();
    const query = new URLSearchParams(search).get('query');
    const [results, setResults] = useState({ products: [], articles: [] });
    const [loading, setLoading] = useState(false);

    useSolidNavbar(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await getSearchResultService(query);
                if (res.status === 200) {
                    setResults(res.data.data);
                }
            } catch (error) {
                console.log('error fetching search results', error);
            } finally {
                setLoading(false);
            }
        };
        if (query) {
            fetchResults();
        }
    }, [query]);


    return (
        <>
            {
                loading ? (
                    <div className="h-screen">
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className='pt-24 pb-16 container'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-xs md:text-base px-3 md:px-5 py-2 md:py-1 text-gray-100
                            bg-gradient-to-r w-fit from-mgreen to-[#1F917C] 
                            rounded-full font-medium'>
                                <span>جستجو برای : </span>
                                <span className='text-yellow-200'>{query}</span>
                            </h2>
                            <NavLink
                                to={'/'}
                                className="bg-violet-500 text-white 
                                p-2 rounded-full font-medium"
                            >
                                <FaArrowCircleLeft className='text-lg md:text-xl' />
                            </NavLink>
                        </div>
                        <hr className='border-2 border-gray-300 my-5' />
                        {results.products.length > 0 ? (
                            <>
                                <h3 className="my-5 text-gray-500 text-xs 
                                    md:text-base font-medium">
                                    محصولات
                                </h3>
                                <div className='grid grid-cols-4 gap-1 md:gap-2'>
                                    {results.products.map(product => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            colSpan={true}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : null}
                        <div>
                            {results.articles.length > 0 ? (
                                <>
                                    <h3 className="my-5 text-gray-500 text-xs 
                                        md:text-base font-medium">
                                        مقالات
                                    </h3>
                                    <div className='grid grid-cols-3 gap-1 md:gap-3'>
                                        {results.articles.map(article => (
                                            <ArticleCard key={article._id} article={article} />
                                        ))}
                                    </div>
                                </>
                            ) : null}
                            {
                                results.products.length === 0 && results.articles.length === 0 ? (
                                    <div className='text-sm md:text-xl py-36'>
                                        <p className='text-center text-gray-500'>
                                            نتیجه ای برای جستجوی شما پیدا نشد...!
                                        </p>
                                    </div>
                                ) : null
                            }

                        </div>
                    </div>
                )
            }
            <Footer />
        </>
    )
}

export default SearchResultPage
