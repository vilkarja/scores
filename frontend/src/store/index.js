import Vue from 'vue';
import Vuex from 'vuex';
import api from '../../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    messageId: 0,
    token: '',
    user: {
      id: null,
      username: null
    },
    scoreBoard: {
      id: null,
      name: null
    }
  },
  mutations: {
    addMessage(state, msg) {
      msg.id = state.messageId;
      state.messageId++;
      state.messages.push(msg);
    },
    removeMessage(state, msgIdToRemove) {
      state.messages = state.messages.filter(msg => msg.id !== msgIdToRemove);
    },
    authSuccess(state, data) {
      state.token = data.token
      Vue.set(state, 'user', data.user);
      Vue.set(state, 'scoreBoard', data.scoreBoard);
    },
    logout(state) {
      state.token = ''
      state = { ...state, user: {} }
      state = { ...state, scoreBoard: {} }
    }
  },
  getters: {
    messages: state => state.messages,
    newestMessage: state => state.messages.length === 0 ? {} : state.messages.reduce((prev,
      curr) => {
      return prev.id < curr.id ? prev : curr;
    }),
    isLoggedIn: state => !!state.token,
    token: state => state.token,
    username: state => state.user.username,
    activeScoreBoardId: state => state.scoreBoard.id

  },
  actions: {
    login({
      commit
    }, credentials) {
      return new Promise((resolve, reject) => {
        api.authenticate(credentials)
          .then(response => {
            const data = {
              token: response.token,
              user: response.user,
              scoreBoard: response.scoreBoard
            };

            localStorage.setItem('token', data.token);
            commit('authSuccess', data);
            resolve(response);
          })
          .catch(error => {
            localStorage.removeItem('token');
            reject(error);
          })
      })
    },
    logout({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        resolve();
      })
    }
  },
  modules: {}
});
