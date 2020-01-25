<template>
  <v-container py-2>
    <v-row dense class="flex-wrap" justify="center">
      <v-col cols="3" sm="3">{{position}}.</v-col>
      <v-col cols="6" sm="3">{{scoreObj.userName}}</v-col>
      <v-col cols="3" sm="3">{{scoreObj.points}}</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ScoreRow",
  props: {
    scoreObj: {
      type: Object,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
</style>