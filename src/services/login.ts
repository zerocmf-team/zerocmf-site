import { request } from '@/utils/request';
/*
 *@Author: frank
 *@Date: 2022-02-17 12:53:56
 *@Description: 用户登录
*/
export const getToken = (data: any) => {
    return request(`/api/oauth/token`, {
        method: 'post',
        data,
    });
};
