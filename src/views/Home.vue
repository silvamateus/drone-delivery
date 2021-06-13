<template>
  <div class="home">
    <search-filter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchFilter from "@/components/SearchFilter.vue";
import { getDrones } from "@/services/getDrones";
import { drone } from "@/types/dronesResponse";
@Component({
  components: {
    SearchFilter,
  },
})
export default class Home extends Vue {
  drones: drone[] | [] = [];

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
      if (error.name != "NavigationDuplicated") {
        throw error;
      }
    });
    let page = this.$route.query.page;
    if (!page) page = "1";
    if (typeof page === "string") {
      this.fetchDrones(page);
    }
  }
}
</script>
