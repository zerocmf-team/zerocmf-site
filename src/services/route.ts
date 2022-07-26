import { request } from '@/utils/request';
export const getRoutes = () => {
  return request(`/api/v1/portal/app/route`, {
    method: 'GET',
  });
};
