<template>
    <div class="container">
        <SwitchButtons
            :buttons="autoSwhitchButtons"
            :value="selectedValue"
            @onSwitch="onSwitchSelection"
        />

        <PassportForm v-if="selectedValue === 1" />
    </div>
</template>

<script>
import SwitchButtons from '../SwitchButtons.vue';
import PassportForm from './PassportForm.vue';

export default {
    components: {
        SwitchButtons,
        PassportForm,
    },
    data() {
        return {
            selectedValue: 1,
            autoSwhitchButtons: [
                {
                    id: 1,
                    name: 'Pasaport',
                    value: 1,
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
