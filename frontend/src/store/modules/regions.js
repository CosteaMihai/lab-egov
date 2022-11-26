import RegionsService from '@/services/RegionsService.js';

export const namespaced = true;

export const state = {
    regions: null,
};

export const mutations = {
    SET_REGIONS(state, payload) {
        state.regions = payload;
    },
};

export const actions = {
    async getAllRegions({ commit }) {
        try {
            const regions = await RegionsService.getRegions();
            commit('SET_REGIONS', regions.data);
        } catch (error) {
            console.log(error);
        }
    },
};

export const getters = {
    regions: (state) => state.regions,
};
