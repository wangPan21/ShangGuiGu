//配置路由信息
export default [{
        path: '/Home',
        component: () =>
            import ('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/Search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
        name: 'search',
        meta: { show: true }
    },
    {
        path: '/Login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }

    },
    {
        path: '/Register',
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false }

    },
    {
        path: '/Detail/:skuid?',
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true }

    },
    {
        path: '/Trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车来
            if (from.path == '/ShopCart') {
                next();
            } else {
                //若从其他页面来，不放行且停留在当前
                next(false);
            }
        }

    },
    {
        path: '/AddCartSuccess',
        name: 'addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true }

    },
    {
        path: '/ShopCart',
        name: 'shopCart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true }

    },
    {
        path: '/Pay',
        name: 'Pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去结算页面，必须是从交易页面来
            if (from.path == '/Trade') {
                next();
            } else {
                //若从其他页面来，不放行且停留在当前
                next(false);
            }
        }

    },
    {
        path: '/PaySuccess',
        name: 'PaySuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: true }

    },
    {
        path: '/Center',
        name: 'Center',
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        //子路由
        children: [{
                path: 'myOrder',
                component: () =>
                    import ('@/pages/Center/myOrder'),
            },
            {
                path: 'groupOrder',
                component: () =>
                    import ('@/pages/Center/groupOrder'),
            },
            {
                path: '/Center',
                redirect: '/Center/myOrder'
            }
        ]
    },
    {
        path: '/',
        redirect: '/Home',
        component: () =>
            import ('@/pages/Home'),
    },

]