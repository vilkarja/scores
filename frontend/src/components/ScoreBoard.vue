<template>
  <v-container>
    <v-row text-center justify="center" class="flex-wrap">
      <v-col cols="12">
        <v-progress-circular v-if="loading" indeterminate size="128"></v-progress-circular>

        <v-col v-else class="elevation-4 py-3">
          <v-col cols="12">
            <ScoreRow
              v-for="(scoreObj, index) in scores.slice(startIndex, endIndex)"
              :key="`${scoreObj.id}`"
              :scoreObj="scoreObj"
              :position=" index + 1"
            ></ScoreRow>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../api";
import ScoreRow from "@/components/ScoreRow.vue";

export default {
  name: "ScoreBoard",
  components: {
    ScoreRow
  },
  data() {
    return {
      scores: [],
      loading: false,
      error: ""
    };
  },
  mounted() {
    this.getAllScores();
  },
  computed: {},
  methods: {
    async getAllScores() {
      this.loading = true;
      try {
        let scores = await api.getScoresBySort(this.sortDirection);
        this.scores = scores;
      } catch (e) {
        console.log(e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
