const routes = [
    {
        path: '/',
        component: '@/layout/BasicLayout',
        routes: [
            {
                path: '/install',
                component: '@/install',
            },
            {
                path: '/user/account/center',
                component: '@/pages/user/account/center',
            },
            {
                path: '/user/settings',
                component: '@/layout/UserProfileLayout',
                routes: [
                    {
                        path: 'profile',
                        title:'基本设置',
                        component: '@/pages/user/settings/Profile',
                    },
                    {
                        path: 'account',
                        title:'账号设置',
                        component: '@/pages/user/settings/Account',
                    },
                    {
                        path: '*',
                        component: '@/pages/404',
                    }
                ]
            },
            {
                path: '*',
                component: '@/routes',
            },
        ],
    }
];

export default routes;
