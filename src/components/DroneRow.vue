<template>
  <tr>
    <td>{{ drone.id }}</td>
    <td>
      <customer-cell :name="drone.name" :address="drone.address"></customer-cell>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Drone } from "@/types/dronesResponse";
import CustomerCell from "./table-cells/CustomerCell.vue";

@Component({
  components: { CustomerCell },
})
export default class extends Vue {
  @Prop() drone!: Drone;
}
</script>

<style scoped></style>
