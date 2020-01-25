<template>
  <v-container fluid>
    <v-row class="justify-center flex-wrap" mt-2>
      <v-col cols="auto" sm="3">
        <v-btn text :disabled="startIndex<=0" @click="previousItems" color="blue">
          <v-icon>mdi-chevron-left</v-icon>
          {{$vuetify.breakpoint.xsOnly ? `` : `Previous ${itemsToShow}` }}
        </v-btn>
      </v-col>
      <v-col cols="auto" sm="6" class="subtitle-1">
        <p v-if="$vuetify.breakpoint.xsOnly">{{startIndex + 1}} - {{endIndex}}</p>
        <p v-else>{{startIndex + 1}} - {{endIndex}} / {{listLength}}</p>
      </v-col>
      <v-col cols="auto" sm="3">
        <v-btn text :disabled="endIndex>=listLength" @click="nextItems" color="blue">
          {{$vuetify.breakpoint.xsOnly ? `` : `Next ${itemsToShow}` }}
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TableActionRow",
  props: {
    itemsToShow: {
      type: Number,
      required: true
    },
    startIndex: {
      type: Number,
      required: true
    },
    endIndex: {
      type: Number,
      required: true
    },
    listLength: {
      type: Number,
      required: true
    }
  },
  methods: {
    previousItems() {
      this.$emit("showPreviousItems");
    },
    nextItems() {
      this.$emit("showNextItems");
    }
  }
};
</script>

<style>
</style>