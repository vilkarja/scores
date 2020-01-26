<template>
  <v-col class="flex-grow-0 flex-shrink-1">
    <v-btn class="ml-auto" color="amber" @click="openModal">Add new score</v-btn>
    <v-dialog v-model="isDialogOpen" max-width="400" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-card-title class="headline">Add new highscore</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="usernameRule"
            :counter="50"
            label="Username"
            required
          ></v-text-field>
          <v-text-field v-model="points" label="Points" type="integer" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="resetFields" :disabled="loading">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="submitScore" :loading="loading">Add score</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import api from "../../api";
export default {
  name: "AddNewScoreBtn",
  data: () => ({
    isDialogOpen: false,
    loading: false,
    username: "",
    points: 0,
    usernameRule: [
      v => !!v || "Username is required",
      v => v.length <= 50 || "Username must be less than 50 characters",
      v => v.length > 2 || "Username must be more than 2 characters"
    ]
  }),
  methods: {
    openModal() {
      this.isDialogOpen = true;
    },
    resetFields() {
      this.isDialogOpen = false;
      this.username = null;
      this.points = 0;
      this.$refs.form.resetValidation();
    },
    async submitScore() {
      this.loading = true;
      try {
        await api.postScore({
          userName: this.username,
          points: parseInt(this.points)
        });
        this.$emit("scoresUpdated");
        this.$store.commit("addMessage", {
          type: "success",
          text: "New score added succesfully!"
        });
      } catch (e) {
        console.log(e);
        this.$store.commit("addMessage", {
          type: "error",
          text: "Error occured when trying to add new score!"
        });
      } finally {
        this.isDialogOpen = false;
        this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>