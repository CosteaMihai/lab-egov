import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import VueApexCharts from 'vue-apexcharts';

Vue.use(Vuelidate);
Vue.use(VueApexCharts);

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
    NProgress.start();
    return config;
});

apiClient.interceptors.response.use((response) => {
    NProgress.done();
    return response;
});

Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function(h) {
        return h(App);
    },
}).$mount('#app');
