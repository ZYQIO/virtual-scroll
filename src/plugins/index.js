import VirtualScroll from './VirtualScroll.vue';

console.log('VirtualScroll', VirtualScroll);

const plugin = {
    install (_Vue) {
        _Vue.component(VirtualScroll.name, VirtualScroll)
    }

}

export default plugin;
