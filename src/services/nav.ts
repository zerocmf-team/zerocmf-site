import { authRequest } from '@/utils/request';

export const navItemOptions = (navId: number) => {
    return authRequest(`/api/v1/portal/admin/nav_items/options`, {
        method: 'GET',
        params: {
            'nav_id': navId
        }
    });
}

export const navItemUrls = () => {
    return authRequest(`/api/v1/portal/admin/nav_items/urls`, {
        method: 'GET',
    });
}

export const addNavItem = (data: any) => {
    return authRequest(`/api/v1/portal/admin/nav_items`, {
        method: 'POST',
        data
    });
}

export const editNavItem = (id: number, data: any) => {
    return authRequest(`/api/v1/portal/admin/nav_items/${id}`, {
        method: 'POST',
        data
    });
}

export const delNavItem = (id: number) => {
    return authRequest(`/api/v1/portal/admin/nav_items/${id}`, {
        method: 'DELETE',
    });
}