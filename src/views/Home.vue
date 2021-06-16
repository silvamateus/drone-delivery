<template>
  <div class="home py-3">
    <search-filter
      @onIdChange="changeId($event)"
      @onNameChange="changeName($event)"
      @onFlyChange="changeFly($event)"
      @onStatusChange="changeStatus($event)"
      :statusArray="statusArray"
      :flightArray="flightArray"
    />
    <drone-list :drones="drones"></drone-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchFilter from "@/components/SearchFilter.vue";
import { getDrones, filterDrones, getDronesFull } from "@/services/getDrones";
import { Drone } from "@/types/dronesResponse";
import { QueryObject } from "@/types/filterQuery";
import DroneList from "@/components/DroneList.vue";
@Component({
  components: {
    SearchFilter,
    DroneList,
  },
})
export default class Home extends Vue {
  drones: Drone[] | [] = [];
  statusArray: string[] = [];
  flightArray: number[] = [];
  numberOfPages = 0;

  async fetchDrones(page: string): Promise<void> {
    try {
      const response = await getDrones(page);
      if (response) this.drones = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  ifHasProperty(item: QueryObject, property: string): boolean {
    return Object.prototype.hasOwnProperty.call(item, property);
  }

  getStatuses(status): string[] {
    return status
      .map((item: QueryObject) => {
        if (this.ifHasProperty(item, "status")) return item.status;
      })
      .filter((item: string, pos: number, self: string[]) => self.indexOf(item) === pos);
  }

  getFlights(flight): number[] {
    return flight
      .map((item: QueryObject) => {
        if (this.ifHasProperty(item, "fly")) return item.fly;
      })
      .filter((item: number, pos: number, self: number[]) => self.indexOf(item) === pos)
      .sort((first, last) => first - last);
  }

  async FillFilters(): Promise<void> {
    try {
      const response = await getDronesFull();
      if (response) {
        this.statusArray = this.getStatuses(response.data);
        this.flightArray = this.getFlights(response.data);
        this.numberOfPages = Math.ceil(response.data.length / 20);
        console.log(this.numberOfPages);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchWithFilter(queryObject: QueryObject): Promise<void> {
    try {
      const response = await filterDrones(queryObject);
      if (response) this.drones = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  changeQuery(queryObject: QueryObject): void {
    this.$router.push({ query: { ...queryObject } }).catch((error) => {
      if (error.name !== "NavigationDuplicated") {
        throw error;
      }
    });
  }
  applyFilter(key: string, val: string): void {
    const queryFilter = {
      [key]: val,
    };
    console.log(queryFilter);
    setTimeout(() => {
      this.changeQuery(queryFilter);
      this.fetchWithFilter(queryFilter);
    }, 1000);
  }
  changeName(val: string): void {
    this.applyFilter("name", val);
  }
  changeId(val: string): void {
    this.applyFilter("id", val);
  }
  changeFly(val: string): void {
    this.applyFilter("fly", val.toString());
  }
  changeStatus(val: string): void {
    this.applyFilter("status", val);
  }
  mounted(): void {
    if (this.$route.query.id && typeof this.$route.query.id === "string") {
      this.fetchWithFilter({ id: this.$route.query.id });
    } else {
      let page = this.$route.query.page;
      if (!page) page = "1";
      if (typeof page === "string") this.fetchDrones(page);
    }
    this.FillFilters();
  }
}
</script>
