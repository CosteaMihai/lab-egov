import Vue from 'vue';
import Vuex from 'vuex';
import * as regions from './modules/regions';
import * as dashboard from './modules/dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        regions,
        dashboard,
    },
});
