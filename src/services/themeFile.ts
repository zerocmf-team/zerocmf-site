import { request,authRequest } from '@/utils/request';

/*
 *@Author: frank
 *@Date: 2022-01-20 20:57:09
 *@Description: 获取所有模板数据
*/

export const getThemeFiles = (params = {}) => {
  return request(`/api/v1/portal/app/theme_files`, {
    method: 'GET',
    params
  });
};

/*
 *@Author: frank
 *@Date: 2022-01-20 20:57:28
 *@Description: 获取单个模板文件
*/

export const getThemeFile = (params = {}) => {
  return request(`/api/v1/portal/app/theme_file`, {
    method: 'GET',
    params
  });
};


/*
 *@Author: frank
 *@Date: 2022-01-19 16:29:32
 *@Description: admin 保存themeFile
*/
export const saveThemeFile = (id: number, data:any) => {
  return authRequest(`/api/v1/portal/admin/theme_file/${id}`, {
    method: 'post',
    data,
  });
};