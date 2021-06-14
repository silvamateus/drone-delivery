<template>
  <div class="customer-cell">
    <b-icon icon="person-fill" font-scale="2"></b-icon>
    <div>
      <p class="name">{{ name }}</p>
      <p class="address">{{ address }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() name!: string;
  @Prop() address!: string;
}
</script>

<style scoped>
p {
  margin: 0;
}

.customer-cell {
  display: flex;
  align-items: center;
}

.customer-cell > div {
  margin-left: 1rem;
}

.name {
  font-weight: 600;
}
.address {
  text-transform: uppercase;
  font-size: 0.5rem;
}
</style>
