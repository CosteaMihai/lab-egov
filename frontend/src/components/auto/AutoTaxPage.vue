<template>
    <div class="container">
        <SwitchButtons
            :buttons="autoSwhitchButtons"
            :value="selectedValue"
            @onSwitch="onSwitchSelection"
        />

        <CarTaxForm v-if="selectedValue === 1" />

        <DrivingLicenseAndRegistrationCertificateForm
            v-if="selectedValue === 2"
        />
    </div>
</template>

<script>
import SwitchButtons from '../SwitchButtons.vue';
import CarTaxForm from './CarTaxForm.vue';
import DrivingLicenseAndRegistrationCertificateForm from './DrivingLicenseAndRegistrationCertificateForm.vue';

export default {
    components: {
        SwitchButtons,
        CarTaxForm,
        DrivingLicenseAndRegistrationCertificateForm,
    },
    data() {
        return {
            selectedValue: 1,
            autoSwhitchButtons: [
                {
                    id: 1,
                    name: 'Impozit masina',
                    value: 1,
                },
                {
                    id: 2,
                    name: 'Permise auto/ Certificate de înmatriculare',
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
