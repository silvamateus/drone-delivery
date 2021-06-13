<template>
  <b-container>
    <b-row>
      <b-col md="2" lg="2">
        <search-input label="Drone ID" v-model="droneID"></search-input
      ></b-col>
      <b-col md="4" lg="4">
        <search-input label="Name" v-model="droneName"></search-input
      ></b-col>
      <b-col md="2" lg="2">
        <search-select label="Current Fly" v-model="droneFly"></search-select>
      </b-col>
      <b-col md="2" lg="2">
        <search-select label="Status" v-model="droneStatus"></search-select>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchInput from "./filter-control/SearchInput.vue";
import SearchSelect from "./filter-control/SearchSelect.vue";

@Component({
  components: { SearchInput, SearchSelect },
})
export default class extends Vue {
  droneID = "";
  droneName = "";
  droneFly = "";
  droneStatus = "";
}
</script>

<style scoped></style>
