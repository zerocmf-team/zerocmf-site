import { authRequest, request } from '@/utils/request';

export const navAdminItems = (data: any) => {
    return authRequest(`/api/v1/portal/admin/nav_items`, {
        method: 'GET',
        params:data,
    });
};

export const navItems = (id: number) => {
    return request(`/api/v1/app/portal/nav_items/${id}`, {
        method: 'GET'
    });
};
