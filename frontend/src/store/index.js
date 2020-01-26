import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    messageId: 0
  },
  mutations: {
    addMessage(state, msg) {
      msg.id = state.messageId;
      state.messageId++;
      state.messages.push(msg);
    },
    removeMessage(state, msgIdToRemove) {
      state.messages = state.messages.filter(msg => msg.id !== msgIdToRemove);
    }
  },
  getters: {
    messages: state => state.messages,
    newestMessage: state => state.messages.length === 0 ? {} : state.messages.reduce(function (
      prev, curr) {
      return prev.id < curr.id ? prev : curr;
    })
  },
  actions: {},
  modules: {}
});
