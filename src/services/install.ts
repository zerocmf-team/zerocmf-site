import { authRequest } from '@/utils/request';
/*
 *@Author: frank
 *@Date: 2022-01-15 09:03:24
 *@Description: 安装主题
*/
export const theme = (data: any) => {
    return authRequest(`/api/v1/portal/admin/theme`, {
        method: 'post',
        data,
    });
};
