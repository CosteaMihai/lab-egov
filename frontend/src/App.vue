<template>
    <div id="app">
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
    components: {
        Header,
    },
};
</script>

<style>
@import url(//db.onlinewebfonts.com/c/aef726001a07788d4c639a835fa10360?family=FF+Tisa);

#app {
    font-family: 'FF Tisa', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
