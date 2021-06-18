<template>
  <b-container>
    <table class="table table-responsive-sm table-hover">
      <thead>
        <tr>
          <th scope="col">drone</th>
          <th scope="col">customer</th>
          <th scope="col">batteries</th>
          <th scope="col">max speed</th>
          <th scope="col" class="center-head">average speed</th>
          <th scope="col" class="center-head">current fly</th>
          <th scope="col" class="center-head">status</th>
        </tr>
      </thead>
      <tbody>
        <drone-row v-for="drone of drones" :drone="drone" :key="drone.id"></drone-row>
      </tbody>
    </table>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Drone } from "@/types/dronesResponse";
import { DroneDetails } from "@/types/dronesDetails";
import DroneRow from "./DroneRow.vue";

@Component({
  components: { DroneRow },
})
export default class extends Vue {
  @Prop() drones!: Drone[];
}
</script>

<style scoped>
thead {
  text-transform: uppercase;
  font-size: 0.7rem;
}

thead,
tbody {
  text-align: left;
}

.center-head {
  text-align: center;
}
</style>
