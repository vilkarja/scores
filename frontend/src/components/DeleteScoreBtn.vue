<template>
  <span>
    <v-btn icon color="red" @click="openDeleteDialog">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-dialog v-model="isDialogOpen" max-width="400" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-card-title class="headline">Confirm delete</v-card-title>
        <v-card-text>Are you sure you want to delete {{scoreObj.userName}}'s score?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="isDialogOpen = false" :disabled="loading">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="confirmDelete" :loading="loading">Delete score</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import api from "../../api";
export default {
  name: "DeleteScoreBtn",
  props: {
    scoreObj: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isDialogOpen: false,
    loading: false
  }),
  methods: {
    openDeleteDialog() {
      this.isDialogOpen = true;
    },
    async confirmDelete() {
      this.loading = true;
      try {
        const res = await api.deleteScore(this.scoreObj.id);
        this.$emit("scoresUpdated");
        this.$store.commit("addMessage", {
          type: "success",
          text: "Score deleted succesfully!"
        });
      } catch (e) {
        console.log(e);
        this.$store.commit("addMessage", {
          type: "Error",
          text: "Error occured when trying to delete score!"
        });
      } finally {
        this.isDialogOpen = false;
        this.loading = true;
      }
    }
  }
};
</script>

<style>
</style>