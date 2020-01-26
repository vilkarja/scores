import Vue from 'vue';
import Vuex from 'vuex';
import api from '../../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    messageId: 0,
    token: localStorage.getItem('token') || '',
    user: {}
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
    auth_success(state, token, user) {
      state.token = token
      state.user = user
    },
    logout(state) {
      state.token = ''
    }
  },
  getters: {
    messages: state => state.messages,
    newestMessage: state => state.messages.length === 0 ? {} : state.messages.reduce((prev,
      curr) => {
      return prev.id < curr.id ? prev : curr;
    }),
    isLoggedIn: state => !!state.token,
    token: state => state.token

  },
  actions: {
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        api.authenticate(user)
          .then(response => {
            const token = response.token;
            const user = response.user;
            localStorage.setItem('token', token);
            commit('auth_success', token, user);
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
