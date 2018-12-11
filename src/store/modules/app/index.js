import * as types from './constant'
export default {
    state: {
        direction:"slide_left"
    },
    actions: {
    },
    mutations: {
        [types.ROUTER_DIRECTION](state, payload) {
            state.direction = payload
        }
    },
    getters: {
        direction(state) {
          return state.direction
        }
    }
}
