import httpService from "./httpService"


export const getArticlesService = () => {
    return httpService('/api/articles', 'get');
}

export const getMostViewedArticleService = () => {
    return httpService('/api/articles/more-view', 'get');
}

export const getSingleArticleService = (articleId) => {
    return httpService(`/api/articles/${articleId}`, 'get');
}

export const patchArticleLikeService = (articleId, data) => {
    return httpService(`/api/articles/${articleId}/likes`, 'patch', data);
}

export const getArticleCommentsService = (articleId) => {
    return httpService(`/api/articles/${articleId}/comments`, 'get');
}

export const postArticleCommentService = (articleId, data) => {
    return httpService(`/api/articles/${articleId}/comments`, 'post', data)
}