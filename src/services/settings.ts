import { request } from '@/utils/request';
export const getSettings = () => {
  return request(`/api/v1/admin/app/settings`, {
    method: 'GET',
  });
};
