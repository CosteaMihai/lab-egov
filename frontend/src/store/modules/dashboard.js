import CarPaymentsService from '@/services/CarPaymentsService.js';

export const namespaced = true;

export const state = {
    carTaxDashboard: null,
    isLoading: false,
};

export const mutations = {
    SET_CAR_TAX_DASHBOARD(state, payload) {
        state.carTaxDashboard = payload;
    },
    CLEAR_CAR_TAX_DASHBOARD(state) {
        state.carTaxDashboard = null;
    },
    SET_IS_LOADING(state) {
        state.isLoading = true;
    },
    CLEAR_IS_LOADING(state) {
        state.isLoading = false;
    },
};

export const actions = {
    async getCarTaxDashboard({ commit }, payload) {
        try {
            commit('SET_IS_LOADING');

            const carTaxDashboardResponse = await CarPaymentsService.getAllCarTaxes(
                payload.startDate,
                payload.endDate
            );
            commit('SET_CAR_TAX_DASHBOARD', carTaxDashboardResponse.data);

            commit('CLEAR_IS_LOADING');
        } catch (error) {
            console.log(error);
        }
    },
    clearData({ commit }) {
        try {
            commit('CLEAR_CAR_TAX_DASHBOARD');
        } catch (error) {
            console.log(error);
        }
    },
};

export const getters = {
    carTaxDashboard: (state) => state.carTaxDashboard,
    isLoading: (state) => state.isLoading,
};
