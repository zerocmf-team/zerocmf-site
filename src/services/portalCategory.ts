import { request, authRequest } from '@/utils/request';
export const getCategory = (id: Number) => {
  return request(`/api/v1/portal/app/list/${id}`, {
    method: 'GET',
  });
};

export const getBreadcrumbs = (id: Number) => {
  return request(`/api/v1/portal/app/breadcrumb/${id}`, {
    method: 'GET',
  });
};

export const getTreesById = (id: Number) => {
  return request(`/api/v1/portal/app/category/trees/${id}`, {
    method: 'GET',
  });
};

export const search = (keywords:string) => {
  return request(`/api/v1/portal/app/list/search?keywords=${keywords}`, {
    method: 'GET',
  });
}


/*
 *@Author: frank
 *@Date: 2022-07-02 18:06:38
 *@Description: 显示分类列表
*/

export const categoryList = () => {
  return authRequest(`/api/v1/portal/admin/category/list`, {
    method: 'GET',
  });
}