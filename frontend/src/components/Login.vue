<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="username" :counter="50" label="username" required :rules="usernameRule"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
        </v-col>
      </v-row>
      <v-btn class="ml-auto" color="amber" @click="login" :loading="loading">Login</v-btn>
      <p class="red--text">{{errorText}}</p>
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
      errorText: "",
      loading: false,
      usernameRule: [
      v => v.length <= 50 || "Username must be less than 50 characters"
    ]
    };
  },
  methods: {
    login() {
      this.loading = true;
      let username = this.username;
      let password = this.password;
      this.$store.dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(error => {
          this.errorText = error.response.data || 'Unexpected error occured'
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>