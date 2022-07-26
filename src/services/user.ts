import { authRequest } from '@/utils/request';

/*
 *@Author: frank
 *@Date: 2022-02-17 12:53:56
 *@Description: 用户登录
*/
export const currentUser = () => {
    return authRequest(`/api/v1/user/current_user`, {
        method: 'get',
    });
};

/*
 *@Author: frank
 *@Date: 2022-03-04 18:25:35
 *@Description: 更新用户信息
*/
export const saveUser = (data:any) => {
    return authRequest(`/api/v1/user/admin/save`, {
        method: 'post',
        data
    });
}
