<template>
    <div class="switch-buttons-container">
        <button
            v-for="button of buttons"
            :key="button.id"
            :style="'width:' + width + '%'"
            @click.prevent="onSwitch(button)"
        >
            {{ button.name }}
        </button>
        <span
            :style="{ width: width + '%', left: left + '%' }"
            class="switch-buttons-overlay"
        ></span>
    </div>
</template>

<script>
export default {
    props: {
        buttons: {
            required: true,
        },
        value: {
            required: true,
        },
    },

    methods: {
        onSwitch(button) {
            if (button.value !== this.value) {
                this.$emit('onSwitch', button.value);
            }
        },
    },

    computed: {
        width() {
            return this.buttons ? 100 / this.buttons.length : 100;
        },
        left() {
            const indexOfSelectedButton = this.buttons
                .map((object) => object.value)
                .indexOf(this.value);
            return this.width * indexOfSelectedButton;
        },
    },
};
</script>

<style scoped>
.switch-buttons-container {
    position: relative;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

.switch-buttons-container button {
    background: transparent;
    border: none;
    font-family: 'FF Tisa', Helvetica, Arial, sans-serif;
    font-size: 18px;
    padding-bottom: 4px;
    border-bottom: 1px solid #2cb1bc;
    color: #2cb1bc;
    cursor: pointer;
}

.switch-buttons-container .switch-buttons-overlay {
    background: rgba(44, 177, 188, 0.15);
    border-radius: 3px;
    height: 31px;
    position: absolute;
    transition: left 0.4s;
}
</style>
