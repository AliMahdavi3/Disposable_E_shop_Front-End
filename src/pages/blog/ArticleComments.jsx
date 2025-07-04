import React, { useCallback, useEffect, useState } from 'react'
import { getArticleCommentsService, postArticleCommentService } from '../../services/blog';
import CommentsList from '../../components/commentsComponents/CommentsList';
import SendingComment from '../../components/commentsComponents/SendingComment';
import { Alert } from '../../utils/sweetalert2';

const ArticleComments = ({ articleId }) => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);

    const fetchComments = useCallback(async () => {
        try {
            const res = await getArticleCommentsService(articleId);
            setComments(res.data.articleComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [articleId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const getRatingLabel = (rating) => {
        const ratings = {
            1: { label: 'ضعیف', color: 'text-red-500' },
            2: { label: 'متوسط', color: 'text-orange-500' },
            3: { label: 'خوب', color: 'text-yellow-500' },
            4: { label: 'خیلی خوب', color: 'text-teal-500' },
            5: { label: 'عالی', color: 'text-green-500' }
        };
        return ratings[rating] || { label: 'بدون امتیاز', color: 'text-gray-500' };
    };

    const handleCommentSubmit = async (event) => {
        try {
            event.preventDefault();
            const commentData = {
                content: newComment,
            };
            if (rating > 0) {
                commentData.rating = rating;
            }
            const res = await postArticleCommentService(articleId, commentData);
            if (res.status === 201) {
                Alert('عملیات موفقیت آمیز بود', 'نظر شما ارسال شد!', 'success');
                fetchComments();
                setNewComment('');
                setRating(0);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            Alert('خطایی رخ داده است', error.message, 'error');
        }
    };

    return (
        <>
            <div className='my-5'>
                <div className='bg-mgreen text-white font-medium w-[60%] text-xs 
                    md:text-sm lg:w-[20%] text-center py-2 rounded-t-lg'>
                    دیدگاه ها درباره این مقاله
                </div>
                <hr className="border-2 border-mgreen" />
            </div>

            <CommentsList comments={comments} getRatingLabel={getRatingLabel} />
            <SendingComment
                handleCommentSubmit={handleCommentSubmit}
                newComment={newComment}
                setNewComment={setNewComment}
                rating={rating}
                setRating={setRating}
            />
        </>
    )
}

export default ArticleComments
