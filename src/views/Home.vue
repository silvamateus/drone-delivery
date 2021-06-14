<template>
  <div class="home py-3">
    <search-filter />
    <drone-list :drones="drones"></drone-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchFilter from "@/components/SearchFilter.vue";
import { getDrones } from "@/services/getDrones";
import { Drone } from "@/types/dronesResponse";
import DroneList from "@/components/DroneList.vue";
@Component({
  components: {
    SearchFilter,
    DroneList,
  },
})
export default class Home extends Vue {
  drones: Drone[] | [] = [];

  async fetchDrones(page: string): Promise<void> {
    try {
      const response = await getDrones(page);
      if (response) this.drones = response.data;
    } catch (error) {
      console.error(error);
    }
  }
  mounted(): void {
    this.$router.push({ query: { limit: "20" } }).catch((error) => {
      if (error.name !== "NavigationDuplicated") {
        throw error;
      }
    });
    let page = this.$route.query.page;
    if (!page) page = "1";
    if (typeof page === "string") this.fetchDrones(page);
  }
}
</script>
