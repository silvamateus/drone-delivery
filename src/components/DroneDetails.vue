<template>
  <div class="details d-flex flex-column p-4 justify-content-center align-items-center">
    <div>
      <img :src="drone.image" alt="Drone avatar" class="drone-avatar mx-2" />
    </div>
    <div class="d-flex align-items-center px-2 my-2 item">
      <p class="px-2 item-identifier">id:</p>
      <p>{{ drone.id }}</p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">name:</p>
      <p>{{ drone.name }}</p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">address:</p>
      <p>{{ drone.address }}</p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">status:</p>
      <p>{{ drone.status }}</p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">max speed:</p>
      <p><speed-cell :speed="drone.max_speed"></speed-cell></p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">average speed:</p>
      <p><speed-cell :speed="drone.average_speed"></speed-cell></p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">current fly:</p>
      <p>{{ flyProgress }}%</p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">battery:</p>
      <p>{{ drone.battery }}%</p>
    </div>
    <div class="d-flex align-items-center px-2 mb-2 item">
      <p class="px-2 item-identifier">status:</p>
      <p><status-cell :status="drone.status" class="mt-2"></status-cell></p>
    </div>
    <div class="d-flex align-items-center px-2 my-2 item">
      <p><b-button variant="success" class="item-identifier back-button" @click="goBack()">go back</b-button></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDroneDetails } from "@/services/getDrones";
import { Drone } from "@/types/dronesResponse";
import SpeedCell from "@/components/table-cells/SpeedCell.vue";
import StatusCell from "@/components/table-cells/StatusCell.vue";

@Component({
  components: { SpeedCell, StatusCell },
})
export default class extends Vue {
  drone: Drone = {};

  async getDetails(): Promise<void> {
    const response = await getDroneDetails(this.$route.params.id);
    if (response) console.log(response.data);
    if (response) this.drone = response.data;
  }

  get flyProgress(): number | string {
    let flyStatus = "";
    if (this.drone.fly && this.drone.fly > 50) flyStatus = "coming";
    else flyStatus = "going";

    return this.drone.fly ? ` ${flyStatus} ${((this.drone.fly % 51) / 50) * 100}` : 0;
  }

  goBack(): void {
    this.$router.push("/");
  }

  mounted(): void {
    console.log(this.$route.params);
    this.getDetails();
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.details {
  height: 100vh;
}
.item {
  width: max-content;
  margin: auto;
}
/* .item > div:nth-child(odd) {
  background-color: rgb(211, 211, 211);
} */

.item-identifier {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8rem;
}

.drone-avatar {
  border-radius: 100%;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.26);
}

.back-button {
  color: white;
  border-radius: 1rem;
}
</style>
