import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../components/MainPage.vue';
import AutoTaxPage from '../components/auto/AutoTaxPage.vue';
import IdentityCardsTaxPage from '../components/identity-cards/IdentityCardsTaxPage.vue';
import DashboardPage from '../components/dashboard/DashboardPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/auto',
        name: 'AutoTaxPage',
        component: AutoTaxPage,
    },
    {
        path: '/identity-cards',
        name: 'IdentityCardsTaxPage',
        component: IdentityCardsTaxPage,
    },
    {
        path: '/dashboard',
        name: 'DashboardPage',
        component: DashboardPage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
