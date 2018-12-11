<template>
    <div id="app">
        <transition :name="direction">
            <keep-alive>
                <router-view />
            </keep-alive>
        </transition>
    </div>
</template>
<script>

import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import { mapGetters } from "vuex"
export default {
    name: 'App',
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['direction'])
    }
}

</script>
<style>
.slide_left-enter-active,
.slide_left-leave-active,
.slide_right-enter-active,
.slide_right-leave-active {
    position: absolute;
    top: 0;
    width: 100%;
    transition: transform 0.5s;
}

.slide_left-enter,
.slide_left-leave-to,
.slide_right-enter,
.slide_right-leave-to {
    transform: translateX(100%);
}

.slide_left-leave-to {
    transition: transform 0s;
    transition-delay: 0.5s;
}

.slide_right-enter-to {
    transition: transform 0s;
}
</style>
