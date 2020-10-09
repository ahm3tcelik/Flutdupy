const auth = {
    namespaced: true,
    state: {
        loggedIn: false,
        token: '',
    },
    getters: {
        loggedIn: (state) => {
            return state.loggedIn;
        },
        token: (state) => {
            return state.token;
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.loggedIn = value;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        }
    },
    actions: {
        fetchAuth({commit}, payload) {
            console.log('gelen');
            console.log(payload);
            payload.loggedIn ? commit('SET_TOKEN', payload.token) : commit('SET_TOKEN', '');
            commit('SET_LOGGED_IN', payload.loggedIn);
        }
    }

}

export default auth;