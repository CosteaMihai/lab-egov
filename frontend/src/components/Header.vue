<template>
    <div class="header">
        <router-link to="/" class="logo">
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="540.543px"
                height="540.543px"
                viewBox="0 0 540.543 540.543"
                style="enable-background:new 0 0 540.543 540.543;"
                xml:space="preserve"
            >
                <g>
                    <g>
                        <path
                            d="M129.989,378.772c8.274,0,15.361-5.006,21.243-15.036c53.813-95.423,81.806-145.093,83.991-149.028l-53.593-93.458
			c-5.667-9.804-12.858-14.707-21.567-14.707H81.953c-5.019,0-8.495,1.634-10.459,4.902c-2.399,3.268-2.289,7.301,0.325,12.087
			l52.613,91.176c0.214,0.232,0.214,0.331,0,0.331L41.75,361.453c-2.172,4.149-2.172,8.066,0,11.757
			c2.173,3.715,5.557,5.562,10.129,5.562H129.989z"
                        />
                        <path
                            d="M488.492,0h-78.758c-8.495,0-15.472,4.902-20.912,14.707C277.053,212.97,219.206,315.596,215.283,322.555l110.784,203.282
			c5.227,9.804,12.418,14.706,21.567,14.706h78.104c4.791,0,8.28-1.634,10.459-4.902c2.172-3.715,2.068-7.748-0.325-12.099
			L326.073,322.555v-0.318L498.627,16.995c2.393-4.571,2.393-8.592,0-12.087C496.662,1.634,493.284,0,488.492,0z"
                        />
                    </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
            </svg>
        </router-link>
        <div class="title">Plati Online</div>
        <div class="menu" v-click-outside="hideMenu">
            <button @click.prevent="isMenuOpen = !isMenuOpen">
                <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="124px"
                    height="124px"
                    viewBox="0 0 124 124"
                    style="enable-background:new 0 0 124 124;"
                    xml:space="preserve"
                >
                    <g>
                        <path
                            d="M112,6H12C5.4,6,0,11.4,0,18s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,6,112,6z"
                        />
                        <path
                            d="M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z"
                        />
                        <path
                            d="M112,94H12c-6.6,0-12,5.4-12,12s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,94,112,94z"
                        />
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                </svg>
            </button>
            <div v-show="isMenuOpen" class="menu-container">
                <router-link
                    v-for="item in menu"
                    :key="item.id"
                    :to="item.route"
                >
                    {{ item.text }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
    directives: {
        ClickOutside,
    },
    data() {
        return {
            isMenuOpen: false,
            menu: [
                {
                    id: 1,
                    text: 'Plati auto',
                    route: '/auto',
                },
                {
                    id: 2,
                    text: 'Plati carti de identitate',
                    route: '/identity-cards',
                },
                {
                    id: 3,
                    text: 'Dashboard',
                    route: '/dashboard',
                },
            ],
        };
    },
    methods: {
        hideMenu() {
            this.isMenuOpen = false;
        },
    },
};
</script>

<style>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 90%;
    margin-right: auto;
    margin-left: auto;
    height: 100px;
}

.header .logo svg {
    fill: #2cb1bc;
    height: 40px;
    width: 40px;
}

.header .title {
    font-size: 26px;
}

.header .menu {
    position: relative;
}

.header .menu button {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
        rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
        rgba(0, 0, 0, 0.07) 0px 16px 16px;
}

.header .menu .menu-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0;
    margin-top: 5px;
    min-width: 200px;
    border-radius: 3px;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
        rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
        rgba(0, 0, 0, 0.07) 0px 16px 16px;
}

.header .menu .menu-container a {
    text-decoration: none;
    background: #2cb1bc;
    color: white;
    padding: 7px 10px;
    cursor: pointer;
    transition: 0.4s background;
}

.header .menu .menu-container a:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.header .menu .menu-container a:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}

.header .menu .menu-container a:hover {
    background: #30bac7;
}

.header .menu button {
    display: flex;
    padding: 7px;
    background: #2cb1bc;
    border-radius: 3px;
    border: none;
    cursor: pointer;
}

.header .menu button svg {
    fill: white;
    height: 25px;
    width: 25px;
}
</style>
