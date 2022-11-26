import { apiClient } from '../main';

const getRegions = async () => {
    return await apiClient.get('regions');
};

const addRegion = async (form) => {
    return await apiClient.post('region', form);
};

export default {
    getRegions,
    addRegion,
};
