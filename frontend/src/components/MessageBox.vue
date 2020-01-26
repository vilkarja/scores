<template>
  <v-snackbar :color="snackType" dismissible="true" v-model="snackbar" :timeout="timeout">
    {{snackText}}
    <v-btn color="white" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "MessageBox",
  data: () => ({
    message: {
      id: null,
      type: null,
      text: null
    },
    snackbar: false,
    timeout: 5000
  }),
  computed: {
    storeMessages() {
      return this.$store.getters.messages;
    },
    snackType() {
      return this.message.type;
    },
    snackText() {
      return this.message.text;
    }
  },
  watch: {
    storeMessages: function(newVal, oldVal) {
      if (newVal.length !== 0) {
        const newestMessage = this.$store.getters.newestMessage;
        this.message = Object.assign({}, this.message, newestMessage);
        this.snackbar = true;
        setTimeout(() => this.removeMessage(newestMessage.id), this.timeout);
      }
    }
  },
  methods: {
    removeMessage(msgId) {
      this.$store.commit("removeMessage", msgId);
    }
  }
};
</script>

<style>
</style>