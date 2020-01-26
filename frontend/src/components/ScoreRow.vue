<template>
  <v-container py-2>
    <v-row dense class="bottom-border" justify="center">
      <v-col cols="2" sm="2" md="2" offset-md="1" class="text-left">{{position}}.</v-col>
      <v-col cols="5" sm="4" md="5" class="wrap-text">{{scoreObj.userName}}</v-col>
      <v-col cols="4" sm="3" md="3" offset-md="-5" class="text-right">
        {{scoreObj.points}}
        <DeleteScoreBtn :scoreObj="scoreObj" @scoresUpdated="scoresUpdated"></DeleteScoreBtn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import DeleteScoreBtn from "@/components/DeleteScoreBtn.vue";

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
  },
  components: {
    DeleteScoreBtn
  },
  methods: {
    scoresUpdated() {
      this.$emit("scoresUpdated");
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

.bottom-border {
  border-color: rgba(0, 0, 0, 0.12);
}
</style>