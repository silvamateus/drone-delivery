<template>
  <div class="pt-1">
    <span class="status" :class="{ warn: statusIs('delayed'), danger: statusIs('failed') }">{{ status }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() status!: string;

  statusIs(statusToCompare: string): boolean {
    return this.status === statusToCompare;
  }
}
</script>

<style scoped>
.status {
  background-color: var(--bg-status);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-transform: uppercase;
  font-size: 0.7rem;
  color: white;
  font-weight: 600;
}

.warn {
  --bg-status: #f1c40f;
}
.danger {
  --bg-status: #e74c3c;
}
</style>
