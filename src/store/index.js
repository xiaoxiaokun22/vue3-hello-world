import {createStore} from 'vuex'

export default createStore({
    state: {
        token:'',
        tagsList: [],
        brands:[],
        chart:{},
    },
    mutations: {
        setToken(state, token){
            state.token = token
        },
        clearTags(state) {
            state.tagsList = []
        },
    },
    getters: {
        getToken(state) {
            if (!state.token) {
                state.token = localStorage.getItem('token')
            }
            return state.token
        }
    },
    actions: {
        setTokenAction(state, token){
            state.token = token
        }, 
    },
    modules: {}
})