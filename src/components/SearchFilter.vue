<template>
  <b-container>
    <b-row>
      <b-col md="2" lg="2"> <search-input label="Drone ID" v-model="droneID"></search-input></b-col>
      <b-col md="4" lg="6"> <search-input label="Name" v-model="droneName"></search-input></b-col>
      <b-col md="2" lg="2">
        <search-select label="Current Fly" v-model="droneFly" :options="flightArray"></search-select>
      </b-col>
      <b-col md="2" lg="2">
        <search-select label="Status" v-model="droneStatus" :options="statusArray"></search-select>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SearchInput from "./filter-control/SearchInput.vue";
import SearchSelect from "./filter-control/SearchSelect.vue";

@Component({
  components: { SearchInput, SearchSelect },
})
export default class extends Vue {
  @Prop() statusArray?: string[];
  @Prop() flightArray?: number[];
  droneID = "";
  droneName = "";
  droneFly = "";
  droneStatus = "";

  @Watch("droneID")
  onIdChange(val: string): void {
    this.$emit("onIdChange", val);
  }

  @Watch("droneName")
  onNameChange(val: string): void {
    this.$emit("onNameChange", val);
  }

  @Watch("droneFly")
  onFlyChange(val: string): void {
    this.$emit("onFlyChange", val);
  }

  @Watch("droneStatus")
  onStatusChange(val: string): void {
    this.$emit("onStatusChange", val);
  }
}
</script>

<style scoped></style>
