import Main from '../views/Main';
import Login from '../views/Login'
import NotFound from '../views/error-page/404'
import NoPermission from '../views/error-page/403'
import ServerSideError from '../views/error-page/500'
import UserList from '../views/user/UserList'
import UserForm from '../views/user/UserForm'
import AmountList from '../views/amount/AmountList'
import Page from '../views/page/page'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: Login,
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: NotFound
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: NoPermission,
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: ServerSideError,
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    redirect: {name: 'home'},
    component: Main,
    children: [
        {
            path: 'home',
            name: 'home',
            redirect: {name: 'user-list'}
        },
        {
            path: 'user/:userId/books',
            title: '订单详情',
            name: 'user-books',
            component: () => import('../views/book/BookList')
        }]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/user',
        name: 'user',
        icon: 'ios-folder',
        title: '用户管理',
        component: Main,
        children: [{
            path: 'list',
            name: 'user-list',
            icon: 'ios-paper-outline',
            title: '用户列表',
            component: UserList,
        }, {
            path: 'form',
            name: 'user-form',
            icon: 'ios-paper-outline',
            title: '添加用户',
            component: UserForm,
        }]
    },
    {
        path: '/amount',
        name: 'amount',
        icon: 'ios-folder',
        title: '阅点',
        component: Main,
        children: [{
            path: 'list',
            name: 'amount-list',
            title: '阅点列表',
            component: AmountList,
        }, {
            path: 'form',
            title: '阅点明细',
            name: 'amount-form',
            component: Page,
        }]
    }, {
        path: '/book',
        name: 'book',
        icon: 'ios-folder',
        title: '图书',
        component: Main,
        children: [{
            path: 'account-list',
            name: 'book-account-list',
            title: '用户图书列表',
            component: () => import('../views/book/BookAccountList'),
        }, {
            path: 'form',
            title: '图书上下架',
            name: 'book-form',
            component: Page,
        }]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
