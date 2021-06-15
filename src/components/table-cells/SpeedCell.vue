<template>
  <div class="speed-container">
    {{ getPrefix() }}.<span class="sufix">{{ getSufix() }}</span> <span class="speed-unit">m/h</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() speed!: number;

  getPrefix(): string | undefined {
    const prefix = this.speed
      .toString()
      .match(/(\d+)./g)
      ?.toString()
      .replace(".", "");
    if (!prefix) return this.speed.toString();
    if (prefix) return prefix;
  }

  getSufix(): string | number | undefined {
    const sufix = this.speed
      .toString()
      .match(/.(\d+)$/g)
      ?.toString()
      .replace(".", "");
    if (!sufix) return 0;
    if (sufix) return sufix;
  }
}
</script>

<style scoped>
.speed-container {
  font-size: 1.4rem;
}
.sufix {
  font-size: 1rem;
}
.speed-unit {
  font-size: 0.7rem;
}
</style>
