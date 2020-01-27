<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex my-4>
        <h1 class="display-2 font-weight-bold mb-1">Highscores</h1>
      </v-flex>
      <ScoreBoard></ScoreBoard>
    </v-layout>
  </v-container>
</template>

<script>
import ScoreBoard from "@/components/ScoreBoard.vue";

export default {
  name: "home",
  components: {
    ScoreBoard
  }
};
</script>
