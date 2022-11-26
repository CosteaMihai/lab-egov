<template>
    <div class="container">
        <CarTaxReport v-if="selectedValue === 1" />
    </div>
</template>

<script>
import SwitchButtons from '../SwitchButtons.vue';
import CarTaxReport from './CarTaxReport.vue';
import IdentityCardReport from './IdentityCardReport.vue';

export default {
    components: {
        SwitchButtons,
        IdentityCardReport,
        CarTaxReport,
    },
    data() {
        return {
            selectedValue: 1,
            autoSwhitchButtons: [
                {
                    id: 1,
                    name: 'Plati auto',
                    value: 1,
                },
                {
                    id: 2,
                    name: 'Plati carti de identitate',
                    value: 2,
                },
            ],
        };
    },
    methods: {
        onSwitchSelection(value) {
            this.selectedValue = value;
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px 0px;
}
</style>
