import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SendingComment = ({ handleCommentSubmit, newComment, setNewComment, rating, setRating }) => {

    const [hover, setHover] = useState(0);
    const navigate = useNavigate();

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token != null;
    }

    const handleRating = (rateValue) => {
        setRating(rateValue);
    };

    return (
        <>
            {
                !isAuthenticated() ? (
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-mgreen rounded-lg text-white px-4
                        py-2 hover:bg-violet-600'
                    >
                        برای ارسال نظر لطفا وارد حساب کاربری خود شوید
                    </button>
                ) : (
                    <form
                        onSubmit={handleCommentSubmit}
                        className="space-y-3"
                    >
                        <span className='text-xs md:text-sm text-gray-600'>
                            دادن امتیاز به این محصول
                        </span>
                        <div className="flex">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;

                                return (
                                    <label key={index} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => handleRating(ratingValue)}
                                            className="sr-only"
                                        />
                                        <FaStar
                                            className={`${ratingValue <= (hover || rating) ?
                                                "text-yellow-500" : "text-gray-300"} h-5 w-5`}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(rating)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <textarea
                            value={newComment}
                            rows='5'
                            onChange={(event) => setNewComment(event.target.value)}
                            placeholder="نوشتن نظر درباره این محصول...!"
                            required
                            className="w-full p-2 border-2 rounded-lg focus:ring
                                focus:ring-opacity-50"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-mgreen cursor-pointer 
                            rounded-lg hover:bg-violet-700 text-white"
                        >
                            ارسال نظر
                        </button>
                    </form >
                )
            }
        </>
    )
}

export default SendingComment
