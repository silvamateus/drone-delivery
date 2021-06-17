<template>
  <tr class="clickable" @click="openDetails()">
    <td>{{ drone.id }}</td>
    <td>
      <customer-cell :name="drone.name" :address="drone.address"></customer-cell>
    </td>
    <td class="battery-cell">
      <battery-cell :percentage="drone.battery"></battery-cell>
    </td>
    <td class="center-cell">
      <speed-cell :speed="drone.max_speed"></speed-cell>
    </td>
    <td class="center-cell">
      <speed-cell :speed="drone.average_speed"></speed-cell>
    </td>
    <td class="center-cell">
      <current-fly-cell :fly="drone.fly" :status="drone.status"></current-fly-cell>
    </td>
    <td class="center-cell">
      <status-cell :status="drone.status"></status-cell>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Drone } from "@/types/dronesResponse";
import CustomerCell from "./table-cells/CustomerCell.vue";
import BatteryCell from "./table-cells/BatteryCell.vue";
import SpeedCell from "./table-cells/SpeedCell.vue";
import CurrentFlyCell from "./table-cells/CurrentFlyCell.vue";
import StatusCell from "./table-cells/StatusCell.vue";

@Component({
  components: { CustomerCell, BatteryCell, SpeedCell, CurrentFlyCell, StatusCell },
})
export default class extends Vue {
  @Prop() drone!: Drone;

  openDetails(): void {
    this.$emit("openDetails", { open: true, id: this.drone.id });
  }
}
</script>

<style scoped>
.battery-cell {
  position: relative;
  height: 100%;
  width: 5rem;
}
.center-cell {
  text-align: center;
}
.clickable {
  cursor: pointer;
}
</style>
