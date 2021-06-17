<template>
  <div class="d-flex justify-content-center align-items-center">
    <b-button v-if="isGreaterThan()" variant="light" @click="previousPage()"
      ><b-icon icon="arrow-left-circle"></b-icon
    ></b-button>
    <b-button variant="light" class="page-number" disabled>{{ page }}</b-button>
    <b-button v-if="isLessThan()" variant="light" @click="nextPage()"
      ><b-icon icon="arrow-right-circle"></b-icon
    ></b-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() page!: number;
  @Prop() numberOfPages!: number;

  previousPage(): void {
    this.$emit("previousPage", `${this.page - 1}`);
  }
  nextPage(): void {
    console.log("a");
    this.$emit("nextPage", `${this.page + 1}`);
  }

  isGreaterThan() {
    return this.page > 1;
  }
  isLessThan() {
    return this.page < this.numberOfPages;
  }
}
</script>

<style scoped>
.page-number:disabled {
  color: #000 !important;
  font-weight: 600;
  opacity: 1;
  font-size: 1.5rem;
  cursor: initial;
}
</style>
