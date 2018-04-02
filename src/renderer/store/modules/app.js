import {appRouter, otherRouter} from '../../router/router';

const app = {
    state: {
        menuList: appRouter,
        routers: [
            otherRouter,
            ...appRouter
        ]
    },
    mutations: {
    }
};

export default app;
