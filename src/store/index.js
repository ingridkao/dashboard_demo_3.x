import { createStore } from 'vuex'

export default createStore({
    state: {
        rainfallLayerShow: ""
    },
    getters: {},
    mutations: {
        changeRainfall(state, string) {
            state.rainfallLayerShow = string
        }
    },
    actions: {},
    modules: {}
})