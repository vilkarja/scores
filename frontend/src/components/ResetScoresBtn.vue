<template>
  <v-col class="flex-grow-0 flex-shrink-1">
    <v-btn text class="ml-auto" color="red" :disabled="isDisabled" @click="openModal">Reset</v-btn>
    <v-dialog v-model="isDialogOpen" max-width="400" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-card-title class="headline">Reset scoreboard?</v-card-title>
        <v-card-text>Are you sure you want to reset the scoreboard?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="isDialogOpen = false;" :disabled="loading">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="resetScores" :loading="loading">Reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import api from "../../api";
export default {
  name: "ResetScoresBtn",
  props: {
    isDisabled: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    isDialogOpen: false,
    loading: false
  }),
  methods: {
    openModal() {
      this.isDialogOpen = true;
    },
    async resetScores() {
      this.loading = true;
      try {
        await api.resetScores({});

        this.$emit("scoresUpdated");

        this.$store.commit("addMessage", {
          type: "success",
          text: "All scores reseted!"
        });
      } catch (e) {
        console.log(e);
        this.$store.commit("addMessage", {
          type: "error",
          text: "Error occured when trying reset scores!"
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