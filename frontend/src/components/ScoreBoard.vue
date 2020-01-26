<template>
  <v-container>
    <v-row text-center justify="center" class="flex-wrap">
      <v-col cols="12">
        <v-progress-circular v-if="loading" indeterminate size="128"></v-progress-circular>

        <v-col v-else class="elevation-4 py-3">
          <TableActionRow
            :startIndex="startIndex"
            :endIndex="endIndex"
            :listLength="scores.length"
            :itemsToShow="itemsToShow"
            @showPreviousItems="previousItems"
            @showNextItems="nextItems"
          ></TableActionRow>
          <v-row my-1 class="flex-wrap" justify="center">
            <v-col cols="2" sm="2" md="2" class="title font-weight-bold mb-1">Ranking</v-col>
            <v-col cols="5" sm="4" md="3" class="title font-weight-bold mb-1">Username</v-col>
            <v-col cols="4" sm="3" md="2" class="title font-weight-bold mb-1 text-right">
              Points
              <v-btn icon @click="changeSort">
                <v-icon>{{sortingIcon}}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-col cols="12" md="8" offset-md="2">
            <ScoreRow
              v-for="(scoreObj, index) in scores.slice(startIndex, endIndex)"
              :key="`${scoreObj.id}`"
              :scoreObj="scoreObj"
              :position="sortDirection==='desc' ? index + startIndex + 1 : scores.length - index - startIndex "
              @scoresUpdated="getAllScores"
            ></ScoreRow>
          </v-col>
          <v-row class="justify-end">
            <AddNewScoreBtn @scoresUpdated="getAllScores"></AddNewScoreBtn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../api";
import ScoreRow from "@/components/ScoreRow.vue";
import AddNewScoreBtn from "@/components/AddNewScoreBtn.vue";
import TableActionRow from "@/components/TableActionRow.vue";

export default {
  name: "ScoreBoard",
  components: {
    ScoreRow,
    AddNewScoreBtn,
    TableActionRow
  },
  data() {
    return {
      scores: [],
      loading: false,
      error: "",
      startIndex: 0,
      endIndex: 10,
      itemsToShow: 10,
      sortDirection: "desc"
    };
  },
  mounted() {
    this.getAllScores();
  },
  computed: {
    sortingIcon() {
      return this.sortDirection === "desc" ? "mdi-arrow-down" : "mdi-arrow-up";
    }
  },
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
    },
    async changeSort() {
      this.loading = true;
      let newSort;
      if (this.sortDirection === "desc") {
        newSort = "asc";
      } else {
        newSort = "desc";
      }

      try {
        let scores = await api.getScoresBySort(newSort);
        this.scores = scores;

        // Change sort order only if scores are fetched succesfully
        this.sortDirection = newSort;
      } catch (e) {
        console.log(e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    previousItems() {
      const newStartIndex = this.startIndex - this.itemsToShow;
      if (newStartIndex <= 0) {
        this.startIndex = 0;
        this.endIndex = this.itemsToShow;
      } else {
        const newEndIndex = this.endIndex - this.itemsToShow;

        if (newEndIndex % this.itemsToShow === 0) {
          this.startIndex = newStartIndex;
          this.endIndex = this.endIndex - this.itemsToShow;
        } else {
          // If endIndex - startIndex is less than itemsToShow
          // fix endIndex so that table show correct amount of items
          const modulo = newEndIndex % this.itemsToShow;
          this.startIndex = newStartIndex;
          this.endIndex =
            this.endIndex - this.itemsToShow + (this.itemsToShow - modulo);
        }
      }
    },
    nextItems() {
      const newEndIndex = this.endIndex + this.itemsToShow;
      if (newEndIndex >= this.scores.length) {
        this.endIndex = this.scores.length;
        this.startIndex = this.startIndex + this.itemsToShow;
      } else {
        this.endIndex = newEndIndex;
        this.startIndex = this.startIndex + this.itemsToShow;
      }
    }
  }
};
</script>
