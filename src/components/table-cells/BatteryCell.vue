<template>
  <div class="battery-block" @mouseenter="onHover()" @mouseleave="onHoverEnd()">
    <div class="percentage-block">
      <div
        class="battery-percentage"
        :class="{ 'percentage-warning': changeBarColor(25), 'percentage-danger': changeBarColor(15) }"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
    <transition name="fade">
      <div v-if="showPercentage" class="percentage-tooltip" :style="{ left: `calc(${percentage}% - 18px)` }">
        <p>{{ percentage }}%</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() percentage!: number;

  showPercentage = false;

  onHover(): void {
    this.showPercentage = true;
  }

  onHoverEnd(): void {
    this.showPercentage = false;
  }

  changeBarColor(numberToTest: number): boolean {
    return this.percentage <= numberToTest;
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.percentage-block {
  width: 100%;
  height: 100%;
  background-color: #bbb9b9;
  border-radius: 1rem;
}
.battery-block {
  width: 5rem;
  height: 5px;
  position: absolute;
  top: 30px;
  right: 2px;
}

.battery-percentage {
  background-color: var(--bg-percentage);
  height: 100%;
  border-radius: 1rem;
}
.percentage-warning {
  --bg-percentage: #f1c40f;
}
.percentage-danger {
  --bg-percentage: #e74c3c;
}

.percentage-tooltip {
  background-color: #acc4d4cc;
  border: 1px solid white;
  width: max-content;
  padding: 0.3rem 0.5rem;
  position: absolute;
  top: -26px;
  font-size: 0.5rem;
  border-radius: 0.4rem;
}

.percentage-tooltip::before,
.percentage-tooltip::after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  right: 12px;
}

.percentage-tooltip::before {
  border-width: 5px 3.5px 0 3.5px;
  border-color: white transparent transparent transparent;
  bottom: -5px;
}

.percentage-tooltip::after {
  border-width: 5px 3.5px 0 3.5px;
  border-color: #acc4d4cc transparent transparent transparent;
  bottom: -4px;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
