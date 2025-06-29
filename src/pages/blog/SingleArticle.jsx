import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import { FaEye, FaHeart, FaRegHeart } from 'react-icons/fa';
import ArticleComments from './ArticleComments';
import { convertDateToJalali } from '../../utils/convertDate';
import { getSingleArticleService, patchArticleLikeService } from '../../services/blog';
import useSolidNavbar from '../../hooks/useSolidNavbar';
import SpinnerLoad from '../../components/SpinnerLoad';
import { Alert, Toast } from '../../utils/sweetalert2';
import { apiPath } from '../../services/httpService';

const SingleArticle = () => {

    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [liked, setLiked] = useState(false);
    const token = localStorage.getItem('token');

    useSolidNavbar(true);

    useEffect(() => {
        const fetchSingleArticle = async () => {
            try {
                const res = await getSingleArticleService(articleId);
                if (res.status === 200) {
                    setArticle(res.data.article);
                    console.log(res.data);
                }
            } catch (error) {
                Alert('خطایی رخ داده است!', error.message, 'error');
                console.log('error fetching articles', error);
            }
        }
        fetchSingleArticle();
    }, [articleId]);


    const handleLikeArticle = async () => {
        if (token) {
            try {
                const res = await patchArticleLikeService(articleId, { increment: liked ? -1 : 1 });
                if (res.status === 200) {
                    Toast('خوشحالیم که از این مقاله خوشتون اومده', 'success');
                    setArticle(prevArticle => ({
                        ...prevArticle,
                        likes: res.data.likes
                    }));
                    setLiked(!liked);
                }
            } catch (error) {
                Toast('خطایی رخ داده است!', 'error');
                console.error('Error updating likes', error);
            }
        } else {
            Toast('لطفا وارد حساب خود شوید!', 'warning');
        }
    };

    return (
        <>
            {
                !article ? (
                    <div className="h-screen">
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className='pt-24 pb-10 container'>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                            <div className='md:col-span-3 h-full shadow-lg border-white 
                                border-4 rounded-md'
                            >
                                <img className='rounded-t-md w-full h-96 object-cover'
                                    src={`${apiPath}/${article.imageUrl}`}
                                    alt={article.title}
                                />

                                <div className="p-5 text-gray-500">
                                    <div className='flex justify-between items-center 
                                        text-base md:text-xl'>
                                        <h1 className='font-bold text-gray-700'>
                                            {article.title}
                                        </h1>
                                        <p
                                            onClick={handleLikeArticle}
                                            className='flex flex-col items-center cursor-pointer'
                                        >
                                            {
                                                liked ? (
                                                    <FaHeart className=' text-rose-600' />
                                                ) : (
                                                    <FaRegHeart className='hover:text-rose-500' />
                                                )
                                            }
                                            <span className='text-xs md:text-sm mt-1'>
                                                {article.likes}
                                            </span>
                                        </p>
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <p className='text-xs'>
                                            <span>نوشته شده در تاریخ : </span>
                                            {convertDateToJalali(article.createdAt)}
                                        </p>
                                    </div>


                                    <div className='flex justify-between
                                        items-center mb-4 mt-2'>
                                        <p className='text-xs'>
                                            <span>زمان مطالعه : </span>
                                            {article.readTime}
                                        </p>
                                        <div className='flex justify-center items-center'>
                                            <FaEye className='me-2' />
                                            <span className='text-xs'>
                                                {article.views}
                                            </span>
                                        </div>
                                    </div>
                                    <p className='text-sm md:text-base font-semibold mb-2'>خلاصه مقاله : </p>
                                    <p className='mb-4 text-xs md:text-sm'>{article.excerpt}</p>
                                    <p className='text-sm md:text-base font-semibold mb-2'>محتوای مقاله : </p>
                                    <div className='text-xs md:text-base'>{article.content}</div>
                                    <p className='py-5'>
                                        <span className='text-sm md:text-base'>دسته‌بندی : </span>
                                        <span className='text-xs md:text-sm bg-violet-500 rounded-full
                                            px-4 py-2 text-white mt-2'>
                                            {article.categories}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Author info */}
                            <div className='md:col-span-1 h-fit shadow-lg rounded-md mt-4 md:mt-0'>
                                <div className='flex justify-center items-center py-5'>
                                    <img
                                        className='rounded-full border-2 w-32 h-32 object-cover'
                                        src={`${apiPath}/${article.author.profileImage}`}
                                        alt={article.author.name}
                                    />
                                </div>
                                <div className='text-xs text-gray-500'>
                                    <p className='font-medium px-5 text-center'>
                                        <span>{article.author.name}</span>
                                    </p>
                                    <p className='px-5 py-3'>
                                        {article.author.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ArticleComments articleId={articleId} />
                    </div>
                )
            }
            <Footer />
        </>
    )
}

export default SingleArticle
