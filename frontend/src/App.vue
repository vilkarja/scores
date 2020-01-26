<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center title">Scores app</div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <MessageBox></MessageBox>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import MessageBox from "@/components/MessageBox.vue";
export default {
  name: "App",

  components: { MessageBox },

  data: () => ({})
};
</script>
