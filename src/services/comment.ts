import { authRequest } from '@/utils/request';

export const addComment = (id: Number,data:any) => {
    return authRequest(`/api/v1/portal/app/comment/${id}`, {
        method: 'POST',
        data
    });
};

export const addReply = (id: Number,data:any) => {
    return authRequest(`/api/v1/portal/app/comment/reply/${id}`, {
        method: 'POST',
        data
    });
};

/*
 *@Author: frank
 *@Date: 2022-02-13 09:17:47
 *@Description: 点赞文章
*/
export const like = (id: Number) => {
    return authRequest(`/api/v1/portal/app/comment/like/${id}`, {
        method: 'POST',
    });
};

export const replyLike = (id: Number) => {
    return authRequest(`/api/v1/portal/app/comment/reply/like/${id}`, {
        method: 'POST',
    });
};

