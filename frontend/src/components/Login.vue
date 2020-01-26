<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="username" :counter="50" label="username" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
        </v-col>
      </v-row>
      <v-btn class="ml-auto" color="amber" @click="login">Login</v-btn>
      <p>{{errorText}}</p>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorText: ""
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.$store.dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(error => {
          this.errorText = error.response.data || 'Unexpected error occured'
        });
    }
  }
};
</script>

<style>
</style>