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
    <pagination
      v-if="showPagination()"
      :page="parseInt(page)"
      :numberOfPages="numberOfPages"
      @previousPage="changeToPrevious($event)"
      @nextPage="changeToNext($event)"
    ></pagination>
    <loader v-if="loading"></loader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDrones, filterDrones, getDronesFull } from "@/services/getDrones";
import { Drone } from "@/types/dronesResponse";
import { QueryObject } from "@/types/filterQuery";
import SearchFilter from "@/components/SearchFilter.vue";
import DroneList from "@/components/DroneList.vue";
import Pagination from "@/components/Pagination.vue";
import Loader from "@/components/Loader.vue";
@Component({
  components: {
    SearchFilter,
    DroneList,
    Pagination,
    Loader,
  },
})
export default class Home extends Vue {
  drones: Drone[] | [] = [];
  statusArray: string[] = [];
  flightArray: number[] = [];
  numberOfPages = 0;
  page = "";
  isFiltered = false;
  loading = false;

  async fetchDrones(page: string): Promise<void> {
    try {
      const response = await getDrones(page);
      this.loading = false;
      if (response) this.drones = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Methods
   */

  ifHasProperty(item: Drone, property: string): boolean {
    return Object.prototype.hasOwnProperty.call(item, property);
  }

  getStatuses(status: Drone[]): string[] {
    return status
      .map((item: any) => {
        /* I know it's a bad pratice */
        if (this.ifHasProperty(item, "status")) return item.status;
      })
      .filter((item: string, pos: number, self: string[]) => self.indexOf(item) === pos);
  }

  getFlights(flight: Drone[]): number[] {
    return flight
      .map((item: any) => {
        /* I know it's a bad pratice */
        if (this.ifHasProperty(item, "fly")) return item.fly;
      })
      .filter((item: number, pos: number, self: number[]) => self.indexOf(item) === pos)
      .sort((first, last) => first - last);
  }

  async fillFilters(): Promise<void> {
    this.loading = true;
    try {
      const response = await getDronesFull();
      if (response) {
        this.statusArray = this.getStatuses(response.data);
        this.flightArray = this.getFlights(response.data);
        this.numberOfPages = Math.ceil(response.data.length / 20);
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
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
    setTimeout(() => {
      this.changeQuery(queryFilter);
      this.fetchWithFilter(queryFilter);
      this.isFiltered = true;
      this.loading = false;
    }, 1000);
  }

  startLoadingWithDelay(): void {
    setTimeout(() => (this.loading = true), 500);
  }
  changeName(val: string): void {
    this.startLoadingWithDelay();
    this.applyFilter("name", val);
  }
  changeId(val: string): void {
    this.startLoadingWithDelay();
    this.applyFilter("id", val);
  }
  changeFly(val: string): void {
    this.startLoadingWithDelay();
    this.applyFilter("fly", val.toString());
  }
  changeStatus(val: string): void {
    this.startLoadingWithDelay();
    this.applyFilter("status", val);
  }

  changeToNext(page: string): void {
    this.loading = true;
    this.page = page;
    this.changeQuery({ page: page });
    this.fetchDrones(page);
  }
  changeToPrevious(page: string): void {
    this.loading = true;
    this.page = page;
    this.changeQuery({ page: page });
    this.fetchDrones(page);
  }

  showPagination(): boolean {
    return !this.isFiltered;
  }
  /**
   * lifecicle
   */
  mounted(): void {
    this.loading = true;
    if (this.$route.query.id && typeof this.$route.query.id === "string") {
      this.applyFilter("id", this.$route.query.id);
    } else {
      if (typeof this.$route.query.page === "string") this.page = this.$route.query.page;
      if (!this.page) this.page = "1";
      if (typeof this.page === "string") this.fetchDrones(this.page);
    }
    this.fillFilters();
  }
}
</script>
