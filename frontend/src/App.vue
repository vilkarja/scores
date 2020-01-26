<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center title">Scores app</div>

      <v-spacer></v-spacer>
      <span v-if="isLoggedIn">
        <v-btn text @click="logout">Logout</v-btn>
      </span>
    </v-app-bar>

    <v-content>
      <MessageBox></MessageBox>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import MessageBox from "@/components/MessageBox.vue";
export default {
  name: "App",
  components: { MessageBox },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data: () => ({}),
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
