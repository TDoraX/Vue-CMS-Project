import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        login: false,
        token: null
    },
    getters: {
        login: state => {
            return state.login;
        },
        token: state => {
            return state.token;
        }
    },
    mutations: {
        checkLogin: (state, payload) => {
            state.login = payload;
        },
        setToken: (state, payload) => {
            state.token = payload;
        }
    },
    actions: {
        checkLogin: ({commit}, payload) => {
            commit('checkLogin', payload);
        },
        setToken: ({commit}, payload) => {
            commit('setToken', payload);
        }
    }
})
