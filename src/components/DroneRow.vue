<template>
  <tr>
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
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Drone } from "@/types/dronesResponse";
import CustomerCell from "./table-cells/CustomerCell.vue";
import BatteryCell from "./table-cells/BatteryCell.vue";

@Component({
  components: { CustomerCell, BatteryCell },
})
export default class extends Vue {
  @Prop() drone!: Drone;
}
</script>

<style scoped>
.battery-cell {
  position: relative;
  height: 100%;
  width: 5rem;
}
</style>
