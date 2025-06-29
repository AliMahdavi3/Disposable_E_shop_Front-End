import React from 'react'
import { FaStar } from 'react-icons/fa'

const CommentsList = ({ comments, getRatingLabel }) => {
    return (
        <div className='pb-2'>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className='bg-gray-300 mb-3 rounded-lg w-full h-fit 
                        container bg-opacity-50'>
                        <div className='flex justify-between items-center pt-3'>
                            <div className='flex font-medium text-gray-500 justify-center 
                                items-center text-xs md:text-sm'>
                                <p className='ml-5'>
                                    {comment.user ? comment.user.name : 'کاربر ناشناس'}
                                </p>
                                <div className='flex'>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`${i < comment.rating ?
                                                "text-yellow-500" : "text-gray-300"}
                                                w-3 h-3 md:h-5 md:w-5`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className={`${getRatingLabel(comment.rating).color} font-medium
                                text-xs md:text-sm`}>
                                {getRatingLabel(comment.rating).label}
                            </p>
                        </div>
                        <p className='py-5 text-xs md:text-sm text-gray-700'>
                            {comment.content}
                        </p>
                    </div>
                ))
            ) : (
                <p className='text-center text-sm md:text-base py-5 text-gray-500'>
                    هنوز نظری برای این محصول ثبت نشده!
                </p>
            )}
        </div>
    )
}

export default CommentsList
