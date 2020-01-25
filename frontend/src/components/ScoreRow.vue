<template>
  <v-container py-2>
    <v-row dense class="flex-wrap" justify="center">
      <v-col cols="2" sm="2" offset-sm="1" class="text-left">{{position}}.</v-col>
      <v-col cols="5" sm="3" class="wrap-text">{{scoreObj.userName}}</v-col>
      <v-col cols="4" sm="2" class="text-right">
        {{scoreObj.points}}
        <v-btn icon color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
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

<style scoped>
.wrap-text {
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: normal;
  hyphens: auto;
}
</style>